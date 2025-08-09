import * as mqtt from 'mqtt';
import { SensorReading } from '../types';

export class MqttPublisher {
  private client: mqtt.MqttClient;

  constructor(private brokerUrl: string) {
    this.client = mqtt.connect(brokerUrl);
    
    this.client.on('connect', () => {
      console.log(`Connected to MQTT broker: ${brokerUrl}`);
    });

    this.client.on('error', (error) => {
      console.error('MQTT connection error:', error);
    });
  }

  async publish(reading: SensorReading): Promise<void> {
    return new Promise((resolve, reject) => {
      const topic = `sensors/${reading.device_id}/telemetry`;
      const payload = JSON.stringify(reading);

      this.client.publish(topic, payload, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async close(): Promise<void> {
    return new Promise((resolve) => {
      this.client.end(false, {}, () => {
        resolve();
      });
    });
  }
}