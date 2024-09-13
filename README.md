# Store Manager Deploy

A full-stack store management application featuring both frontend and backend components, containerized using Docker. This project enables you to run and test the application in a local development environment with support for debugging and health-checking for dependent services such as the MySQL database.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Tests](#tests)
7. [Troubleshooting](#troubleshooting)
8. [Contributors](#contributors)
9. [License](#license)

## Project Overview
This project consists of a store management system deployed via Docker. It is composed of a React frontend powered by Vite and a backend using Node.js and Express. The application is supported by a MySQL database and is designed for ease of development and testing.

## Features
- **Frontend**: Developed using React and TypeScript, with Vite for hot module reloading and DaisyUI for styling.
- **Backend**: Built with Node.js and Express, featuring a REST API for handling store management operations.
- **Database**: MySQL 8.0, containerized and configured for easy setup with Docker.
- **Docker Compose**: Orchestrates multi-container environments for seamless integration of the frontend, backend, and database services.
- **Testing**: Jest and Testing Library are used for the frontend tests, while the backend tests are run with Vitest.
- **Debugging**: Debug mode is enabled on port 9229 for the backend service.
- **Health checks**: MySQL service is monitored with a health check before allowing connections from the backend.

## Installation

### Prerequisites
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Steps
1. Clone the repository:
   ```bash
   git clone git@github.com:valedobrandi/store_manager_deploy.git
   cd store_manager_deploy
   ```

   Access the application:

    Frontend: http://localhost:5173
    Backend: http://localhost:3001

### Configuration

Environment variables are managed within the docker-compose.yml file. The backend service has the following default configuration:
``` bash
MYSQL_USER: root
MYSQL_PASSWORD: password
MYSQL_HOSTNAME: db
MYSQL_PORT: 3306
PORT: 3001
```
To modify the configuration, you can create a .env file and override the default variables.

### Usage

    Frontend: The frontend can be accessed at http://localhost:5173.
    Backend: The backend is accessible at http://localhost:3001 and uses port 9229 for debugging.
    Database: MySQL runs on port 3306 and can be accessed locally via tools like MySQL Workbench.

### Tests

Frontend

Tests are written using Jest and Testing Library. To run the tests:
``` bash
docker-compose exec frontend npm run test
```

Backend:
The backend tests use Vitest. To run the tests:
``` bash
docker-compose exec backend npm run test
```


### Troubleshooting

    If any service fails to start, check the logs:

    ```bash
  docker-compose logs [service_name]
    ```
Ensure that no other services are using ports 5173, 3001, or 3306.
Make sure Docker and Docker Compose are properly installed.

### Contributors

    valedobrandi

License

This project is licensed under the MIT License.



