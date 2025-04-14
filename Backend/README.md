# Backend for Tasks App

This is the backend service for the Tasks App, built with Node.js and designed to handle task management operations.

## Features

- RESTful API for managing tasks.
- Lightweight and efficient using Node.js with an Alpine-based Docker image.
- Easy to set up and run in a containerized environment.

## Prerequisites

- [Node.js](https://nodejs.org/) installed locally (for development).
- [Docker](https://www.docker.com/) installed (for containerized deployment).

### Using Docker
1. Build the Docker image:
    ```bash
    docker build -t tasks-backend .
    ```

2. Run the container:
    ```bash
    docker run -p 8000:8000 tasks-backend
    ```

## Development

To start the app in development mode:
```bash
npm run dev
```

## Deployment

1. Build the production version:
    ```bash
    npm run build
    ```
