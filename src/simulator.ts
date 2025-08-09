import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { SensorReading, SimulatorConfig } from './types';
import { sensorReadingSchema } from './schema';
import { RandomWalkGenerator } from './generators/random-walk-generator';
import { CsvReplayGenerator } from './generators/csv-replay-generator';
import { MqttPublisher } from './publishers/mqtt-publisher';
import { HttpPublisher } from './publishers/http-publisher';

export class SensorSimulator {
  private ajv: Ajv;
  private randomWalkGenerator?: RandomWalkGenerator;
  private csvReplayGenerator?: CsvReplayGenerator;
  private mqttPublisher?: MqttPublisher;
  private httpPublisher?: HttpPublisher;
  private intervalId?: NodeJS.Timeout;

  constructor(private config: SimulatorConfig) {
    this.ajv = new Ajv();
    addFormats(this.ajv);
    this.ajv.compile(sensorReadingSchema);
    this.initialize();
  }

  private async initialize(): Promise<void> {
    // Initialize generators
    if (this.config.mode === 'random-walk') {
      this.randomWalkGenerator = new RandomWalkGenerator(this.config);
    } else if (this.config.mode === 'csv-replay' && this.config.csvPath) {
      this.csvReplayGenerator = new CsvReplayGenerator(this.config.csvPath);
      await this.csvReplayGenerator.loadData();
    }

    // Initialize publishers
    if (this.config.mqttBroker) {
      this.mqttPublisher = new MqttPublisher(this.config.mqttBroker);
    }
    
    if (this.config.httpEndpoint) {
      this.httpPublisher = new HttpPublisher(this.config.httpEndpoint);
    }
  }

  validateReading(reading: SensorReading): boolean {
    const validate = this.ajv.compile(sensorReadingSchema);
    const valid = validate(reading);
    
    if (!valid) {
      console.error('Schema validation errors:', validate.errors);
      return false;
    }
    
    return true;
  }

  private async generateAndPublishReadings(): Promise<void> {
    try {
      const readings: SensorReading[] = [];

      if (this.config.mode === 'random-walk' && this.randomWalkGenerator) {
        const deviceIds = this.randomWalkGenerator.getDeviceIds();
        for (const deviceId of deviceIds) {
          const reading = this.randomWalkGenerator.generateReading(deviceId);
          readings.push(reading);
        }
      } else if (this.config.mode === 'csv-replay' && this.csvReplayGenerator) {
        for (let i = 0; i < this.config.numDevices; i++) {
          const reading = this.csvReplayGenerator.getNextReading();
          if (reading) readings.push(reading);
        }
      }

      for (const reading of readings) {
        if (!this.validateReading(reading)) {
          console.error('Invalid reading generated:', reading.device_id);
          continue;
        }

        console.log(`Generated reading for ${reading.device_id} at ${reading.timestamp_utc}`);

        // Publish to MQTT if configured
        if (this.mqttPublisher) {
          await this.mqttPublisher.publish(reading);
        }

        // Publish to HTTP if configured
        if (this.httpPublisher) {
          await this.httpPublisher.publish(reading);
        }

        // Log to console if no publishers configured
        if (!this.mqttPublisher && !this.httpPublisher) {
          console.log(JSON.stringify(reading, null, 2));
        }
      }
    } catch (error) {
      console.error('Error generating/publishing readings:', error);
    }
  }

  async start(): Promise<void> {
    console.log(`Starting sensor simulator with ${this.config.numDevices} devices`);
    console.log(`Mode: ${this.config.mode}, Frequency: ${this.config.frequencySeconds}s`);
    
    // Generate initial readings
    await this.generateAndPublishReadings();

    // Schedule recurring readings
    this.intervalId = setInterval(
      () => this.generateAndPublishReadings(),
      this.config.frequencySeconds * 1000
    );
  }

  async stop(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.mqttPublisher) {
      await this.mqttPublisher.close();
    }

    console.log('Sensor simulator stopped');
  }
}
