# Running CHSH Game with Docker

## Prerequisites
- Docker and Docker Compose installed ([guides](https://docs.docker.com/get-docker/))

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd CHSH-game

# Build and run the application
docker-compose up --build

# The application will be available at http://localhost:5001
```

To stop the application:
```bash
docker-compose down
```

### Option 2: Using Docker directly

```bash
# Build the image
docker build -t chsh-game .

# Run the container
docker run -p 5001:5001 chsh-game

# The application will be available at http://localhost:5001
```

## Development

If you want to modify code while running in Docker with hot-reload:

1. Uncomment the volumes section in `docker-compose.yml`
2. Run `npm install` in the `frontend/` directory first (locally)
3. Use `docker-compose up` to start with live code reloading

## Troubleshooting

### Port Already in Use
If port 5001 is already in use, modify the port in `docker-compose.yml`:
```yaml
ports:
  - "8000:5001"  # Maps container's 5001 to your machine's 8000
```

Then access the app at `http://localhost:8000`

### Image Size
- The image is optimized with multi-stage builds
- Frontend is built and only the static files are included
- Python dependencies are cached and optimized

## Notes

- The application runs on `0.0.0.0:5001` by default in the container
- All dependencies are installed automatically during the build
- No need to set up a Python virtual environment locally
- No Node.js installation required on your machine
