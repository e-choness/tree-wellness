FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src/ ./src/
COPY tests/ ./tests/

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy data files
COPY data/ ./data/

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S sensor-sim -u 1001

# Change to non-root user
USER sensor-sim

EXPOSE 3000

# Default command
CMD ["node", "dist/cli.js", "--help"]