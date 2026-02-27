# Multi-stage build: First stage for frontend, second for backend
FROM node:18-alpine as frontend-builder

WORKDIR /app/frontend

# Copy frontend dependencies
COPY frontend/package*.json ./

# Install dependencies and build
RUN npm install

COPY frontend/src ./src
# Optional `public/` folder (not present in this project). Skip copying it to avoid build errors.
# If you add a `frontend/public` folder later, add a `COPY frontend/public ./public` line here.
COPY frontend/index.html ./
COPY frontend/vite.config.js ./
COPY frontend/postcss.config.js ./
COPY frontend/tailwind.config.js ./

# Build frontend
RUN npm run build

# Second stage: Python backend
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY requirements.txt .

# Install production server and Python dependencies
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy backend code
COPY backend/ ./backend/
COPY app.py .
COPY run.sh .

# Copy built frontend from first stage
COPY --from=frontend-builder /app/frontend/dist ./frontend/static

# Expose port
EXPOSE 5001

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV PORT=5001

# Run the application with Gunicorn for production
CMD ["gunicorn", "-b", "0.0.0.0:5001", "-w", "2", "--timeout", "120", "app:app"]
