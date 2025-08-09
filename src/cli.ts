import { Command } from 'commander';
import { SensorSimulator } from './simulator';
import { SimulatorConfig } from './types';

const program = new Command();

program
  .name('sensor-simulator')
  .description('Wildfire sensor simulator')
  .version('1.0.0');

program
  .option('-n, --num-devices <number>', 'Number of devices to simulate', '1')
  .option('-f, --frequency-seconds <number>', 'Frequency in seconds', '30')
  .option('-s, --seed <number>', 'Random seed', Date.now().toString())
  .option('-m, --mode <mode>', 'Generation mode: random-walk or csv-replay', 'random-walk')
  .option('-c, --csv-path <path>', 'Path to CSV file for replay mode')
  .option('--mqtt-broker <url>', 'MQTT broker URL (e.g., mqtt://localhost:1883)')
  .option('--http-endpoint <url>', 'HTTP endpoint URL (e.g., http://localhost:3000)')
  .action(async (options) => {
    const config: SimulatorConfig = {
      numDevices: parseInt(options.numDevices),
      frequencySeconds: parseInt(options.frequencySeconds),
      seed: parseInt(options.seed),
      mode: options.mode,
      csvPath: options.csvPath,
      mqttBroker: options.mqttBroker,
      httpEndpoint: options.httpEndpoint
    };

    if (config.mode === 'csv-replay' && !config.csvPath) {
      console.error('CSV path is required for csv-replay mode');
      process.exit(1);
    }

    if (!config.mqttBroker && !config.httpEndpoint) {
      console.warn('No publishers configured - will output to console only');
    }

    const simulator = new SensorSimulator(config);
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\nShutting down gracefully...');
      await simulator.stop();
      process.exit(0);
    });

    await simulator.start();
  });

program.parse();
