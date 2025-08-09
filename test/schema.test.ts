import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { sensorReadingSchema } from '../src/schema';
import { SensorReading } from '../src/types';

describe('JSON Schema Validation', () => {
  let ajv: Ajv;
  let validate: any;

  beforeAll(() => {
    ajv = new Ajv();
    addFormats(ajv);
    validate = ajv.compile(sensorReadingSchema);
  });

  const validReading: SensorReading = {
    device_id: "silva-000123",
    timestamp_utc: "2025-08-09T23:16:45Z",
    firmware_version: "v1.4.2",
    location: {
      lat: 51.0447,
      lon: -114.0719,
      elevation_m: 1110
    },
    battery: {
      voltage_v: 3.7,
      percent: 82
    },
    radio: {
      rssi_dbm: -72,
      snr_db: 8
    },
    microclimate: {
      temperature_c: 22.4,
      relative_humidity_pct: 38.2,
      air_pressure_hpa: 1011.3,
      soil_moisture_pct: null
    },
    air_quality: {
      voc_ppb: 245,
      co_ppm: 0.5,
      pm1_ugm3: 3.1,
      pm2_5_ugm3: 6.8,
      pm10_ugm3: 9.7,
      iaq_index: 87
    },
    smoke_index: {
      smoke_probability: 0.02,
      smoke_confidence: 0.11
    },
    health: {
      last_calibrated_utc: "2025-07-27T09:00:00Z",
      error_flags: [],
      uptime_seconds: 1310400
    },
    meta: {
      sensor_type: "wildfire_v2",
      manufacturer: "Dryad-like Co",
      notes: ""
    }
  };

  test('validates correct sensor reading', () => {
    const result = validate(validReading);
    expect(result).toBe(true);
    expect(validate.errors).toBeNull();
  });

  test('rejects invalid device_id format', () => {
    const invalidReading = { ...validReading, device_id: "invalid-id" };
    const result = validate(invalidReading);
    expect(result).toBe(false);
    expect(validate.errors).toBeDefined();
  });

  test('rejects invalid timestamp format', () => {
    const invalidReading = { ...validReading, timestamp_utc: "not-a-date" };
    const result = validate(invalidReading);
    expect(result).toBe(false);
    expect(validate.errors).toBeDefined();
  });

  test('rejects out-of-range latitude', () => {
    const invalidReading = { 
      ...validReading, 
      location: { ...validReading.location, lat: 91 }
    };
    const result = validate(invalidReading);
    expect(result).toBe(false);
    expect(validate.errors).toBeDefined();
  });

  test('rejects negative battery percentage', () => {
    const invalidReading = { 
      ...validReading, 
      battery: { ...validReading.battery, percent: -5 }
    };
    const result = validate(invalidReading);
    expect(result).toBe(false);
    expect(validate.errors).toBeDefined();
  });

  test('accepts null soil moisture', () => {
    const readingWithNullSoil = { 
      ...validReading, 
      microclimate: { ...validReading.microclimate, soil_moisture_pct: null }
    };
    const result = validate(readingWithNullSoil);
    expect(result).toBe(true);
  });

  test('rejects missing required fields', () => {
    const { device_id, ...incompleteReading } = validReading;
    const result = validate(incompleteReading);
    expect(result).toBe(false);
    expect(validate.errors).toBeDefined();
  });
});