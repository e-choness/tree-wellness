export const sensorReadingSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    required: [
      "device_id",
      "timestamp_utc",
      "firmware_version",
      "location",
      "battery",
      "radio",
      "microclimate",
      "air_quality",
      "smoke_index",
      "health",
      "meta"
    ],
    properties: {
      device_id: {
        type: "string",
        pattern: "^silva-[0-9]{6}$"
      },
      timestamp_utc: {
        type: "string",
        format: "date-time"
      },
      firmware_version: {
        type: "string",
        pattern: "^v\\d+\\.\\d+\\.\\d+$"
      },
      location: {
        type: "object",
        required: ["lat", "lon", "elevation_m"],
        properties: {
          lat: { type: "number", minimum: -90, maximum: 90 },
          lon: { type: "number", minimum: -180, maximum: 180 },
          elevation_m: { type: "number", minimum: -500, maximum: 9000 }
        }
      },
      battery: {
        type: "object",
        required: ["voltage_v", "percent"],
        properties: {
          voltage_v: { type: "number", minimum: 0, maximum: 5 },
          percent: { type: "integer", minimum: 0, maximum: 100 }
        }
      },
      radio: {
        type: "object",
        required: ["rssi_dbm", "snr_db"],
        properties: {
          rssi_dbm: { type: "number", minimum: -120, maximum: 0 },
          snr_db: { type: "number", minimum: -20, maximum: 30 }
        }
      },
      microclimate: {
        type: "object",
        required: ["temperature_c", "relative_humidity_pct", "air_pressure_hpa", "soil_moisture_pct"],
        properties: {
          temperature_c: { type: "number", minimum: -40, maximum: 60 },
          relative_humidity_pct: { type: "number", minimum: 0, maximum: 100 },
          air_pressure_hpa: { type: "number", minimum: 800, maximum: 1200 },
          soil_moisture_pct: { type: ["number", "null"], minimum: 0, maximum: 100 }
        }
      },
      air_quality: {
        type: "object",
        required: ["voc_ppb", "co_ppm", "pm1_ugm3", "pm2_5_ugm3", "pm10_ugm3", "iaq_index"],
        properties: {
          voc_ppb: { type: "number", minimum: 0, maximum: 10000 },
          co_ppm: { type: "number", minimum: 0, maximum: 50 },
          pm1_ugm3: { type: "number", minimum: 0, maximum: 500 },
          pm2_5_ugm3: { type: "number", minimum: 0, maximum: 500 },
          pm10_ugm3: { type: "number", minimum: 0, maximum: 1000 },
          iaq_index: { type: "integer", minimum: 0, maximum: 500 }
        }
      },
      smoke_index: {
        type: "object",
        required: ["smoke_probability", "smoke_confidence"],
        properties: {
          smoke_probability: { type: "number", minimum: 0, maximum: 1 },
          smoke_confidence: { type: "number", minimum: 0, maximum: 1 }
        }
      },
      health: {
        type: "object",
        required: ["last_calibrated_utc", "error_flags", "uptime_seconds"],
        properties: {
          last_calibrated_utc: { type: "string", format: "date-time" },
          error_flags: {
            type: "array",
            items: { type: "string" }
          },
          uptime_seconds: { type: "integer", minimum: 0 }
        }
      },
      meta: {
        type: "object",
        required: ["sensor_type", "manufacturer", "notes"],
        properties: {
          sensor_type: { type: "string" },
          manufacturer: { type: "string" },
          notes: { type: "string" }
        }
      }
    }
  };
  