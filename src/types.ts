export interface Location {
    lat: number;
    lon: number;
    elevation_m: number;
  }
  
  export interface Battery {
    voltage_v: number;
    percent: number;
  }
  
  export interface Radio {
    rssi_dbm: number;
    snr_db: number;
  }
  
  export interface Microclimate {
    temperature_c: number;
    relative_humidity_pct: number;
    air_pressure_hpa: number;
    soil_moisture_pct: number | null;
  }
  
  export interface AirQuality {
    voc_ppb: number;
    co_ppm: number;
    pm1_ugm3: number;
    pm2_5_ugm3: number;
    pm10_ugm3: number;
    iaq_index: number;
  }
  
  export interface SmokeIndex {
    smoke_probability: number;
    smoke_confidence: number;
  }
  
  export interface Health {
    last_calibrated_utc: string;
    error_flags: string[];
    uptime_seconds: number;
  }
  
  export interface Meta {
    sensor_type: string;
    manufacturer: string;
    notes: string;
  }
  
  export interface SensorReading {
    device_id: string;
    timestamp_utc: string;
    firmware_version: string;
    location: Location;
    battery: Battery;
    radio: Radio;
    microclimate: Microclimate;
    air_quality: AirQuality;
    smoke_index: SmokeIndex;
    health: Health;
    meta: Meta;
  }
  
  export interface SimulatorConfig {
    numDevices: number;
    frequencySeconds: number;
    seed: number;
    mode: 'random-walk' | 'csv-replay';
    csvPath?: string;
    mqttBroker?: string;
    httpEndpoint?: string;
  }
  