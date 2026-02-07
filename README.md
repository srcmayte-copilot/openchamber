# OpenChamber

**Modern PWA for OpenCode AI Coding Agent**

OpenChamber provides a web-based progressive web app (PWA) interface for [OpenCode](https://opencode.ai), built with the latest technologies and best practices.

## Architecture

- **Backend**: NestJS 11 (TypeScript)
- **Frontend**: Vue 3 (TypeScript) with Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS v4
- **Testing**: Jest (server) + Vitest (PWA)
- **PWA**: Service workers, offline support

## Project Structure

```
packages/
├── server/          # NestJS API server
│   ├── src/
│   │   ├── modules/  # Feature modules (health, opencode, settings)
│   │   └── main.ts   # Application entry point
│   └── test/        # Integration tests
└── pwa/             # Vue 3 PWA
    ├── src/
    │   ├── components/  # Vue components
    │   ├── stores/      # Pinia stores
    │   ├── router/      # Vue Router
    │   └── api/         # API client
    └── tests/       # Component tests
```

## Development

### Prerequisites

- Node.js >= 20.0.0
- npm

### Install Dependencies

```bash
npm install
```

### Development Mode

Start both server and PWA in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Server (port 3001)
npm run dev:server

# PWA (port 3000)
npm run dev:pwa
```

### Testing

```bash
# Run all tests
npm test

# Run server tests
npm run test:server

# Run PWA tests
npm run test:pwa

# Test coverage
npm run test:cov
```

### Building

```bash
# Build everything
npm run build

# Build server only
npm run build:server

# Build PWA only
npm run build:pwa
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## API Endpoints

The server runs on port 3001 by default and provides these endpoints:

- `GET /api/health` - Health check
- `GET /api/health/ready` - Readiness check
- `GET /api/opencode/status` - OpenCode server status
- `GET /api/opencode/url` - OpenCode server URL
- `GET /api/settings` - Get all settings
- `GET /api/settings/:key` - Get specific setting
- `PUT /api/settings/:key` - Update setting
- `DELETE /api/settings/:key` - Delete setting

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=3001
OPENCODE_PORT=3002
OPENCODE_SKIP_START=false

# CORS
CORS_ORIGIN=*
```

## Testing

This project follows Test-Driven Development (TDD) principles:

- **Server**: 32 unit tests covering all modules (100% coverage)
- **PWA**: 7 component and store tests

All functionality has corresponding tests to ensure reliability.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT - see [LICENSE](LICENSE) for details.

## Acknowledgments

Built entirely with AI assistance using OpenCode. Original project by Bohdan Triapitsyn.
