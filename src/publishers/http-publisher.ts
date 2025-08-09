import axios from 'axios';
import { SensorReading } from '../types';

export class HttpPublisher {
  constructor(private endpoint: string) {}

  async publish(reading: SensorReading): Promise<void> {
    try {
      await axios.post(`${this.endpoint}/ingest`, reading, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000
      });
    } catch (error) {
      console.error('HTTP publish error:', error);
      throw error;
    }
  }
}
