import seedrandom from 'seedrandom';
import { SensorReading, SimulatorConfig } from '../types';

export class RandomWalkGenerator {
  private rng: seedrandom.PRNG;
  private devices: Map<string, DeviceState> = new Map();

  constructor(private config: SimulatorConfig) {
    this.rng = seedrandom(config.seed.toString());
    this.initializeDevices();
  }

  private initializeDevices(): void {
    for (let i = 0; i < this.config.numDevices; i++) {
      const deviceId = `silva-${String(i + 1).padStart(6, '0')}`;
      this.devices.set(deviceId, {
        location: {
          lat: 51.0447 + (this.rng() - 0.5) * 0.1,
          lon: -114.0719 + (this.rng() - 0.5) * 0.1,
          elevation_m: 1110 + Math.floor((this.rng() - 0.5) * 200)
        },
        battery: {
          voltage_v: 3.7 + (this.rng() - 0.5) * 0.4,
          percent: 50 + Math.floor(this.rng() * 50)
        },
        microclimate: {
          temperature_c: 20 + (this.rng() - 0.5) * 10,
          relative_humidity_pct: 40 + (this.rng() - 0.5) * 30,
          air_pressure_hpa: 1013 + (this.rng() - 0.5) * 40,
          soil_moisture_pct: Math.random() > 0.3 ? 30 + (this.rng() - 0.5) * 40 : null
        },
        air_quality: {
          voc_ppb: 200 + this.rng() * 200,
          co_ppm: 0.3 + this.rng() * 0.5,
          pm1_ugm3: 2 + this.rng() * 5,
          pm2_5_ugm3: 5 + this.rng() * 10,
          pm10_ugm3: 8 + this.rng() * 15,
          iaq_index: 50 + Math.floor(this.rng() * 100)
        },
        smoke_index: {
          smoke_probability: this.rng() * 0.1,
          smoke_confidence: this.rng() * 0.3
        },
        uptime_seconds: Math.floor(this.rng() * 2000000)
      });
    }
  }

  generateReading(deviceId: string): SensorReading {
    const state = this.devices.get(deviceId)!;
    
    // Random walk updates
    state.microclimate.temperature_c += (this.rng() - 0.5) * 2;
    state.microclimate.relative_humidity_pct += (this.rng() - 0.5) * 5;
    state.microclimate.air_pressure_hpa += (this.rng() - 0.5) * 2;
    
    state.air_quality.voc_ppb += (this.rng() - 0.5) * 20;
    state.air_quality.pm2_5_ugm3 += (this.rng() - 0.5) * 2;
    
    state.battery.percent = Math.max(0, state.battery.percent - 0.001);
    state.battery.voltage_v = 3.0 + (state.battery.percent / 100) * 0.8;
    
    state.uptime_seconds += this.config.frequencySeconds;

    // Clamp values to realistic ranges
    state.microclimate.temperature_c = Math.max(-40, Math.min(60, state.microclimate.temperature_c));
    state.microclimate.relative_humidity_pct = Math.max(0, Math.min(100, state.microclimate.relative_humidity_pct));
    state.air_quality.voc_ppb = Math.max(0, Math.min(10000, state.air_quality.voc_ppb));
    state.air_quality.pm2_5_ugm3 = Math.max(0, Math.min(500, state.air_quality.pm2_5_ugm3));

    return {
      device_id: deviceId,
      timestamp_utc: new Date().toISOString(),
      firmware_version: "v1.4.2",
      location: { ...state.location },
      battery: { ...state.battery },
      radio: {
        rssi_dbm: -80 + Math.floor(this.rng() * 20),
        snr_db: 5 + Math.floor(this.rng() * 10)
      },
      microclimate: { ...state.microclimate },
      air_quality: {
        ...state.air_quality,
        pm1_ugm3: Math.max(0, state.air_quality.pm2_5_ugm3 * 0.6),
        pm10_ugm3: Math.max(state.air_quality.pm2_5_ugm3, state.air_quality.pm2_5_ugm3 * 1.5)
      },
      smoke_index: { ...state.smoke_index },
      health: {
        last_calibrated_utc: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
        error_flags: [],
        uptime_seconds: state.uptime_seconds
      },
      meta: {
        sensor_type: "wildfire_v2",
        manufacturer: "Dryad-like Co",
        notes: ""
      }
    };
  }

  getDeviceIds(): string[] {
    return Array.from(this.devices.keys());
  }
}

interface DeviceState {
  location: { lat: number; lon: number; elevation_m: number };
  battery: { voltage_v: number; percent: number };
  microclimate: {
    temperature_c: number;
    relative_humidity_pct: number;
    air_pressure_hpa: number;
    soil_moisture_pct: number | null;
  };
  air_quality: {
    voc_ppb: number;
    co_ppm: number;
    pm1_ugm3: number;
    pm2_5_ugm3: number;
    pm10_ugm3: number;
    iaq_index: number;
  };
  smoke_index: {
    smoke_probability: number;
    smoke_confidence: number;
  };
  uptime_seconds: number;
}