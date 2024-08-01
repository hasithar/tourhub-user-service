# User Service

## Overview

The User Service is responsible for managing users, roles, profiles and authentication for the TourHub application. This service provides RESTful API endpoints to create, read, update, and delete data related to users.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Roles](#roles)
  - [Profiles](#profiles)
  - [Auth](#auth)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository: `git clone git@github.com:hasithar/tourhub-user-service.git`
2. Change directory: `cd tourhub-user-service`
3. Install dependencies: `npm install`

## Configuration

Use environment variables to configure the service.

1. Copy the env.example file to .env `cp env.example .env`
2. Update the .env file with your specific configuration settings.

## Usage

1. Start the service: `npm start`
2. The service will be running at `http://localhost:3000`.

## API Endpoints

### Users

- `GET /api/users`

  - Fetch all users.

- `GET /api/users/:id`

  - Fetch a single user by ID.

- `POST /api/users`

  - Create a new user.

- `PATCH /api/users/:id`

  - Update an existing user by ID.

- `DELETE /api/users/:id`
  - Delete an user by ID.

### Roles

- `GET /api/roles`

  - Fetch all roles.

- `GET /api/roles/:id`

  - Fetch a single role by ID.

- `POST /api/roles`

  - Create a new role.

- `PATCH /api/roles/:id`

  - Update an existing role by ID.

- `DELETE /api/roles/:id`
  - Delete an role by ID.

### Profile

- `GET /api/profiles`

  - Fetch all profiles.

- `GET /api/profiles/:id`

  - Fetch a single profile by ID.

- `POST /api/profiles`

  - Create a new profile.

- `PATCH /api/profiles/:id`

  - Update an existing profile by ID.

- `DELETE /api/profiles/:id`
  - Delete an profile by ID.

### Auth

- `POST /api/auth/register`

  - Create/Register a new user

- `POST /api/auth/login`

  - Login with username/password or email/password

## Contributing

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.
