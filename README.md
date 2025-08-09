# Tree Wellness Sensor Simulator

A comprehensive wildfire sensor simulator that generates realistic environmental data and publishes it via MQTT or HTTP.

## Features

- **Dual Generation Modes**: Random walk simulation or CSV replay
- **Multiple Publishers**: MQTT and HTTP POST support
- **JSON Schema Validation**: Ensures all generated data complies with the sensor schema
- **Configurable**: CLI flags for devices, frequency, seed, and more
- **Dockerized**: Ready-to-run Docker container with docker-compose setup
- **Comprehensive Testing**: Unit tests for schema compliance

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Install TypeScript and Jest locally (if not installed)
npm install --save-dev typescript jest ts-jest @types/jest

# Build the project
npm run build

# Run with default settings (console output only)
npm run dev

# Run with MQTT publishing
npm run dev -- --num-devices 5 --frequency-seconds 10 --mqtt-broker mqtt://localhost:1883

# Run with HTTP publishing
npm run dev -- --num-devices 3 --frequency-seconds 5 --http-endpoint http://localhost:8080

# Run with CSV replay
npm run dev -- --mode csv-replay --csv-path data/sample-traces.csv --num-devices 2
```

### Docker

```bash
# Build and run with docker-compose (includes MQTT broker)
docker-compose up --build

# Run standalone container
docker build -t sensor-simulator .
docker run sensor-simulator node dist/cli.js --num-devices 3 --frequency-seconds 15
```

## CLI Options

| Option                    | Description                                     | Default           |
| ------------------------- | ----------------------------------------------- | ----------------- |
| `-n, --num-devices`       | Number of devices to simulate                   | 1                 |
| `-f, --frequency-seconds` | Frequency in seconds between readings           | 30                |
| `-s, --seed`              | Random seed for reproducible results            | Current timestamp |
| `-m, --mode`              | Generation mode: `random-walk` or `csv-replay`  | random-walk       |
| `-c, --csv-path`          | Path to CSV file for replay mode                | -                 |
| `--mqtt-broker`           | MQTT broker URL (e.g., mqtt://localhost:1883)   | -                 |
| `--http-endpoint`         | HTTP endpoint URL (e.g., http://localhost:8080) | -                 |

## Usage Examples

### Basic Random Walk Simulation

```bash
npm run dev -- --num-devices 10 --frequency-seconds 30 --seed 12345
```

### MQTT Publishing

```bash
npm run dev -- --num-devices 5 --mqtt-broker mqtt://broker.example.com:1883
```

### CSV Replay Mode

```bash
npm run dev -- --mode csv-replay --csv-path data/historical-data.csv --num-devices 3
```

### Multiple Publishers

```bash
npm run dev -- --mqtt-broker mqtt://localhost:1883 --http-endpoint http://localhost:8080
```

## Data Schema

The simulator generates sensor readings with the following structure:

```json
{
  "device_id": "silva-000123",
  "timestamp_utc": "2025-08-09T23:16:45Z",
  "firmware_version": "v1.4.2",
  "location": {
    "lat": 51.0447,
    "lon": -114.0719,
    "elevation_m": 1110
  },
  "battery": {
    "voltage_v": 3.7,
    "percent": 82
  },
  "radio": {
    "rssi_dbm": -72,
    "snr_db": 8
  },
  "microclimate": {
    "temperature_c": 22.4,
    "relative_humidity_pct": 38.2,
    "air_pressure_hpa": 1011.3,
    "soil_moisture_pct": null
  },
  "air_quality": {
    "voc_ppb": 245,
    "co_ppm": 0.5,
    "pm1_ugm3": 3.1,
    "pm2_5_ugm3": 6.8,
    "pm10_ugm3": 9.7,
    "iaq_index": 87
  },
  "smoke_index": {
    "smoke_probability": 0.02,
    "smoke_confidence": 0.11
  },
  "health": {
    "last_calibrated_utc": "2025-07-27T09:00:00Z",
    "error_flags": [],
    "uptime_seconds": 1310400
  },
  "meta": {
    "sensor_type": "wildfire_v2",
    "manufacturer": "Dryad-like Co",
    "notes": ""
  }
}
```

## Publishing Modes

### MQTT

- **Topic Pattern**: `sensors/{device_id}/telemetry`
- **Format**: JSON payload
- **QoS**: 0 (fire-and-forget)

### HTTP POST

- **Endpoint**: `POST /ingest`
- **Content-Type**: `application/json`
- **Timeout**: 5 seconds

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- schema.test.ts
```

## CSV Format

For CSV replay mode, use the following column headers:

- `device_id`, `lat`, `lon`, `elevation_m`
- `battery_voltage_v`, `battery_percent`
- `rssi_dbm`, `snr_db`
- `temperature_c`, `humidity_pct`, `pressure_hpa`, `soil_moisture_pct`
- `voc_ppb`, `co_ppm`, `pm1_ugm3`, `pm2_5_ugm3`, `pm10_ugm3`, `iaq_index`
- `smoke_probability`, `smoke_confidence`
- `last_calibrated_utc`, `error_flags`, `uptime_seconds`
- `sensor_type`, `manufacturer`, `notes`

See `data/sample-traces.csv` for an example.

## Architecture

- **Generators**: Random walk and CSV replay data generation
- **Publishers**: MQTT and HTTP publishing with error handling
- **Validation**: JSON Schema compliance checking
- **CLI**: Commander.js-based command line interface
- **Testing**: Jest-based unit testing

## Development

```bash
# Install dependencies
npm install

# Start development with auto-reload
npm run dev

# Lint code
npm run lint

# Clean build artifacts
npm run clean
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
