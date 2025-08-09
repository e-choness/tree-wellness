import * as fs from 'fs';
import csv from 'csv-parser';
import { SensorReading } from '../types';

export class CsvReplayGenerator {
  private readings: SensorReading[] = [];
  private currentIndex = 0;

  constructor(private csvPath: string) {}

  async loadData(): Promise<void> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      
      fs.createReadStream(this.csvPath)
        .pipe(csv())
        .on('data', (data: Record<string, string>) => results.push(data))
        .on('end', () => {
          this.readings = results.map(this.mapCsvToReading);
          resolve();
        })
        .on('error', reject);
    });
  }

  private mapCsvToReading(row: any): SensorReading {
    return {
      device_id: row.device_id || `silva-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
      timestamp_utc: new Date().toISOString(),
      firmware_version: row.firmware_version || "v1.4.2",
      location: {
        lat: parseFloat(row.lat) || 51.0447,
        lon: parseFloat(row.lon) || -114.0719,
        elevation_m: parseInt(row.elevation_m) || 1110
      },
      battery: {
        voltage_v: parseFloat(row.battery_voltage_v) || 3.7,
        percent: parseInt(row.battery_percent) || 82
      },
      radio: {
        rssi_dbm: parseInt(row.rssi_dbm) || -72,
        snr_db: parseInt(row.snr_db) || 8
      },
      microclimate: {
        temperature_c: parseFloat(row.temperature_c) || 22.4,
        relative_humidity_pct: parseFloat(row.humidity_pct) || 38.2,
        air_pressure_hpa: parseFloat(row.pressure_hpa) || 1011.3,
        soil_moisture_pct: row.soil_moisture_pct ? parseFloat(row.soil_moisture_pct) : null
      },
      air_quality: {
        voc_ppb: parseFloat(row.voc_ppb) || 245,
        co_ppm: parseFloat(row.co_ppm) || 0.5,
        pm1_ugm3: parseFloat(row.pm1_ugm3) || 3.1,
        pm2_5_ugm3: parseFloat(row.pm2_5_ugm3) || 6.8,
        pm10_ugm3: parseFloat(row.pm10_ugm3) || 9.7,
        iaq_index: parseInt(row.iaq_index) || 87
      },
      smoke_index: {
        smoke_probability: parseFloat(row.smoke_probability) || 0.02,
        smoke_confidence: parseFloat(row.smoke_confidence) || 0.11
      },
      health: {
        last_calibrated_utc: row.last_calibrated_utc || "2025-07-27T09:00:00Z",
        error_flags: row.error_flags ? row.error_flags.split(',') : [],
        uptime_seconds: parseInt(row.uptime_seconds) || 1310400
      },
      meta: {
        sensor_type: row.sensor_type || "wildfire_v2",
        manufacturer: row.manufacturer || "Dryad-like Co",
        notes: row.notes || ""
      }
    };
  }

  getNextReading(): SensorReading | null {
    if (this.readings.length === 0) return null;
    
    const reading = this.readings[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.readings.length;
    
    // Update timestamp to current time
    return {
      ...reading,
      timestamp_utc: new Date().toISOString()
    };
  }
}