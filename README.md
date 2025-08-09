# Arbor Vista — Tree Sensor Map & 3D NeRF Viewer

Arbor Vista is a web application designed to visualize and interpret environmental sensor data for tree wellness. It features a live map displaying simulated "Dryad-like" sensors, detailed telemetry readings, AI-driven tree personas, and an interactive 3D viewer.

## Features

- **Interactive Map:** Explore simulated tree sensors on a Leaflet map.
- **Real-time Telemetry:** View detailed sensor readings including temperature, humidity, air quality (IAQ, VOC, CO), and battery levels.
- **AI Persona Insights:** Translate complex sensor metrics into an easy-to-understand "friendly tree voice" with health scores and recommended actions, powered by AI.
- **3D Viewer:** Immerse yourself in a 3D representation of the sensor's environment, providing a unique perspective on tree health.

## Technologies Used

- **Frontend:** React.js
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI, Radix UI
- **Mapping:** Leaflet, React-Leaflet
- **3D Graphics:** React Three Fiber, Drei, Three.js
- **Routing:** React Router DOM
- **State Management/Data Fetching:** React Query
- **Forms:** React Hook Form
- **Date Handling:** Date-fns

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn or bun

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/tree-wellness.git
   cd tree-wellness
   ```

2. Install dependencies:

   ```bash
   npm install
   # or yarn install
   # or bun install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or yarn dev
   # or bun dev
   ```

   The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

- **Map Interaction:** Click on any sensor icon on the map to view its detailed telemetry and AI persona insights.
- **AI Persona:** After selecting a sensor, click "Get Insights" to generate a personalized tree persona.
- **3D View:** Click "Open 3D View" from the sensor details drawer to launch the interactive 3D representation of the selected sensor's location.

## Project Structure

```bash
.
├── public/                 # Static assets
├── src/
│   ├── App.css             # Global CSS
│   ├── App.tsx             # Main application component and routing
│   ├── index.css           # Tailwind CSS entry point
│   ├── main.tsx            # React entry point
│   ├── vite-env.d.ts       # Vite environment types
│   ├── components/         # Reusable UI components
│   │   ├── MapLeaflet.tsx  # Leaflet map component
│   │   ├── theme-toggle.tsx# Theme toggle component
│   │   ├── ThreeViewer.tsx # Three.js 3D viewer component
│   │   └── ui/             # Shadcn UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and data generation
│   │   ├── persona.ts      # AI persona generation logic
│   │   ├── simulator.ts    # Sensor data simulation
│   │   └── utils.ts        # General utilities
│   ├── pages/              # Application pages
│   │   ├── Index.tsx       # Main map and sensor display page
│   │   ├── NotFound.tsx    # 404 page
│   │   └── Viewer3D.tsx    # 3D viewer page
│   └── types/              # TypeScript type definitions
│       └── sensor.ts       # Sensor data types
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── README.md               # Project README
```

## Contributing

We welcome contributions to Arbor Vista! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

Please ensure your code adheres to the existing style and conventions.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgements

- Thanks to the creators of React, Vite, Tailwind CSS, and all the libraries used in this project.
- Special thanks to the open-source community for providing invaluable tools and resources.

## Roadmap

- [ ] Implement real-time sensor data integration.
- [ ] Expand AI persona capabilities with more detailed insights.
- [ ] Add historical data visualization for sensor readings.
- [ ] Improve 3D viewer interactivity and realism.
- [ ] Develop mobile-responsive layouts for all pages.
