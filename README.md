[![FINOS - Incubating](https://cdn.jsdelivr.net/gh/finos/contrib-toolbox@master/images/badge-incubating.svg)](https://finosfoundation.atlassian.net/wiki/display/FINOS/Incubating)

# FINOS DTCC Hackathon


## Project Name
@ivor add instructions here

### Project Details
@ivor add instructions here

### Team Information
@ivor add our team information here incl linkedin


## Table of Contents
- [FINOS DTCC Hackathon](#finos-dtcc-hackathon)
  - [Project Name](#project-name)
    - [Project Details](#project-details)
    - [Team Information](#team-information)
  - [Table of Contents](#table-of-contents)
  - [Technology Stack](#technology-stack)
  - [Setup](#setup)
    - [Installing Required Tools](#installing-required-tools)
      - [1. uv](#1-uv)
      - [2. Node.jsm, npm and pnpm](#2-nodejsm-npm-and-pnpm)
      - [3. Docker](#3-docker)
      - [4. Docker Compose](#4-docker-compose)
    - [Setting Up Environment Variables](#setting-up-environment-variables)
    - [Running the Database](#running-the-database)
    - [Build the project (without Docker):](#build-the-project-without-docker)
      - [Backend](#backend)
      - [Frontend](#frontend)
    - [Build the project (with Docker):](#build-the-project-with-docker)
  - [Running the Application](#running-the-application)
    - [Hot Reload on development](#hot-reload-on-development)
    - [Manual Execution of Hot Reload Commands](#manual-execution-of-hot-reload-commands)
  - [Testing](#testing)
  - [Pre-Commit Setup](#pre-commit-setup)
    - [Installing and Activating Pre-Commit Hooks](#installing-and-activating-pre-commit-hooks)
    - [Email Localhost Setup](#email-localhost-setup)
    - [Running Pre-Commit Checks](#running-pre-commit-checks)
    - [Updating Pre-Commit Hooks](#updating-pre-commit-hooks)
  - [Alembic Database Migrations](#alembic-database-migrations)
  - [Production Deployment](#production-deployment)
    - [Overview](#overview)
  - [TODO:Diogo, add instructions here](#tododiogo-add-instructions-here)
    - [Frontend Deployment](#frontend-deployment)
    - [Backend Deployment](#backend-deployment)
  - [Deployment](#deployment)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Notes](#notes)
  - [**Post-Deployment Configuration**](#post-deployment-configuration)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
    - [Database Connection](#database-connection)
  - [Makefile](#makefile)
    - [Available Commands](#available-commands)
  - [Important Considerations](#important-considerations)
  - [Using DCO to sign your commits](#using-dco-to-sign-your-commits)
    - [Helpful DCO Resources](#helpful-dco-resources)
  - [License](#license)

## Technology Stack
We use [FastAPI](https://fastapi.tiangolo.com/) for the backend and [Next.js](https://nextjs.org/) for the frontend. The backend and frontend is integrated using [@hey-api/openapi-ts](https://github.com/hey-ai/openapi-ts) to generate a type-safe client, with automated watchers to keep the OpenAPI schema and client updated, ensuring a smooth and synchronized development workflow.  

- [Next.js](https://nextjs.org/): Fast, SEO-friendly frontend framework  
- [FastAPI](https://fastapi.tiangolo.com/): High-performance Python backend  
- [SQLAlchemy](https://www.sqlalchemy.org/): Powerful Python SQL toolkit and ORM
- [PostgreSQL](https://www.postgresql.org/): Advanced open-source relational database
- [Pydantic](https://docs.pydantic.dev/): Data validation and settings management using Python type annotations
- [Zod](https://zod.dev/) + [TypeScript](https://www.typescriptlang.org/): End-to-end type safety and schema validation  
- [fastapi-users](https://fastapi-users.github.io/fastapi-users/): Complete authentication system with:
  - Secure password hashing by default
  - JWT (JSON Web Token) authentication
  - Email-based password recovery
- [Alembic](https://alembic.sqlalchemy.org/en/latest/): Database migrations management
- [nextjs-fastapi-template](https://github.com/vintasoftware/nextjs-fastapi-template): Template for project bootstrapping
- [Shadcn/ui](https://ui.shadcn.com/): Beautiful and customizable React components
- [OpenAPI-fetch](https://github.com/Hey-AI/openapi-fetch): Fully typed client generation from OpenAPI schema  
- [fastapi-mail](https://sabuhish.github.io/fastapi-mail/): Efficient email handling for FastAPI applications
- [uv](https://docs.astral.sh/uv/): An extremely fast Python package and project manager
- [Pytest](https://docs.pytest.org/): Powerful Python testing framework
- Code Quality Tools:
  - [Ruff](https://github.com/astral-sh/ruff): Fast Python linter
  - [ESLint](https://eslint.org/): JavaScript/TypeScript code quality
- Hot reload watchers:  
  - Backend: [Watchdog](https://github.com/gorakhargosh/watchdog) for monitoring file changes  
  - Frontend: [Chokidar](https://github.com/paulmillr/chokidar) for live updates  
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/): Consistent environments for development and production
- [MailHog](https://github.com/mailhog/MailHog): Email server for development
- [Pre-commit hooks](https://pre-commit.com/): Enforce code quality with automated checks  
- [OpenAPI JSON schema](https://swagger.io/specification/): Centralized API documentation and client generation  

## Setup

### Installing Required Tools

#### 1. uv
uv is used to manage Python dependencies in the backend. Install uv by following the [official installation guide](https://docs.astral.sh/uv/getting-started/installation/).

#### 2. Node.jsm, npm and pnpm
Ensure Node.js and npm are installed for running the frontend. Follow the [Node.js installation guide](https://nodejs.org/en/download/).
After that install pnpm by running:
```bash
npm install -g pnpm
```

#### 3. Docker
Docker is needed to run the project in a containerized environment. Follow the appropriate installation guide:

- [Install Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
- [Install Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
- [Get Docker CE for Linux](https://docs.docker.com/install/linux/docker-ce/)

#### 4. Docker Compose
Ensure `docker-compose` is installed. Refer to the [Docker Compose installation guide](https://docs.docker.com/compose/install/).

### Setting Up Environment Variables

**Backend (`fastapi_backend/.env`):**
Copy the `.env.example` files to `.env` and update the variables with your own values.
   ```bash
   cd fastapi_backend && cp .env.example .env
   ```
1. You will only need to update the secret keys. You can use the following command to generate a new secret key:
   ```bash
   python3 -c "import secrets; print(secrets.token_hex(32))"
   ```
2. The DATABASE, MAIL, OPENAPI, CORS, and FRONTEND_URL settings are ready to use locally.
3. If you're using Docker, the DATABASE and MAIL settings are already configured in Docker Compose.
4. The OPENAPI_URL setting is commented out. Uncommenting it will hide the /docs and openapi.json URLs, which is ideal for production.
5. You can check the .env.example file for more information about the variables.

**Frontend (`nextjs-frontend/.env.local`):**
Copy the `.env.example` files to `.env`. These values are unlikely to change, so you can leave them as they are.
   ```bash
   cd nextjs-frontend && cp .env.example .env
   ```

### Running the Database
1. Use Docker to run the database to avoid local installation issues. Build and start the database container:
   ```bash
   docker compose build db
   docker compose up -d db
   ```
2. Run the following command to apply database migrations:
   ```bash
   make docker-migrate-db
   ```
3. If this command fails, try to run the migrations manually:
   ```bash
   docker-compose run --rm backend /bin/sh
   uv sync
   alembic upgrade head
   ```

### Build the project (without Docker):
To setup the project environment locally, use the following commands:

#### Backend

1. Navigate to the `fastapi_backend` directory and run:
   ```bash
   uv sync
   ```

#### Frontend
1. Navigate to the `nextjs-frontend` directory and run:
   ```bash
   pnpm install
   ```

### Build the project (with Docker):

1. Build the backend and frontend containers:
   ```bash
   make docker-build
   ```

## Running the Application

If you are not using Docker:

1. Start the FastAPI server:
   ```bash
   make start-backend
   ```

2. Start the Next.js development server:
   ```bash
   make start-frontend
   ```

If you are using Docker:
1. Start the FastAPI server container:
   ```bash
   make docker-start-backend
   ```
2. Start the Next.js development server container:
   ```bash
   make docker-start-frontend
   ```

- **Backend**: Access the API at `http://localhost:8000`.
- **Frontend**: Access the web application at `http://localhost:3000`.

### Hot Reload on development
The project includes two hot reloads when running the application, one for the backend and one for the frontend, which automatically restart local servers when they detect changes. This ensures that the application is always up-to-date without needing manual restarts.

- The **backend hot reload** monitors changes to the backend code.
- The **frontend hot reload** monitors changes to the frontend code, as well as to the `openapi.json` schema generated by the backend.

### Manual Execution of Hot Reload Commands
You can manually execute the same commands that the hot reloads call when they detect a change:

1. To export the `openapi.json` schema:
   ```bash
   cd fastapi_backend && uv run python -m commands.generate_openapi_schema
   ```
   or using Docker:
   ```bash
   docker compose run --rm --no-deps -T backend uv run python -m commands.generate_openapi_schema
   ```

2. To generate the frontend client:
   ```bash
   cd nextjs-frontend && npm run generate-client
   ```
   or using Docker:
   ```bash
   docker compose run --rm --no-deps -T frontend npm run generate-client
   ```

## Testing
To run the tests, you need to run the test database container:
   ```bash
   make docker-up-test-db
   ```

Then run the tests locally:
   ```bash
   make test-backend
   make test-frontend
   ```

Or using Docker:
   ```bash
   make docker-test-backend
   make docker-test-frontend
   ```
## Pre-Commit Setup
To maintain code quality and consistency, the project includes two separate pre-commit configuration files:
- `.pre-commit-config.yaml` for running pre-commit checks locally.
- `.pre-commit-config.docker.yaml` for running pre-commit checks within Docker.

### Installing and Activating Pre-Commit Hooks
To activate pre-commit hooks, run the following commands for each configuration file:

- **For the local configuration file**:
  ```bash
  pre-commit install -c .pre-commit-config.yaml
  ```

- **For the Docker configuration file**:
  ```bash
  pre-commit install -c .pre-commit-config.docker.yaml
  ```

### Email Localhost Setup

To setup the email locally, you need to start [MailHog](https://github.com/mailhog/MailHog) by running the following command:
   ```bash
   make docker-up-mailhog
   ```

- **Email client**: Access the email at `http://localhost:8025`.

### Running Pre-Commit Checks
To manually run the pre-commit checks on all files, use:

```bash
pre-commit run --all-files -c .pre-commit-config.yaml
```

or

```bash
pre-commit run --all-files -c .pre-commit-config.docker.yaml
```

### Updating Pre-Commit Hooks
To update the hooks to their latest versions, run:

```bash
pre-commit autoupdate
```
## Alembic Database Migrations
If you need to create a new Database Migration:
   ```bash
   make docker-db-schema migration_name="add users"
   ```
then apply the migration to the database:
   ```bash
   make docker-migrate-db
   ```

## Production Deployment

### Overview

 TODO:Diogo, add instructions here
---

### Frontend Deployment

1. **Deploying the Frontend**  
   - Click the **Frontend** button above to start the deployment process.  
   - During deployment, you will be prompted to set the `API_BASE_URL`. Use a placeholder value (e.g., `https://`) for now, as this will be updated with the backend URL later.  
   - Complete the deployment process [here](#post-deployment-configuration).

### Backend Deployment

1. **Deploying the Backend**  
   - Click the **Backend** button above to begin deployment.
   - Set up the database first. The connection is automatically configured, so just follow the steps, and it should work by default.
   - During the deployment process, you will be prompted to configure the following environment variables:

     - **CORS_ORIGINS**  
       - Set this to `["*"]` initially to allow all origins. You will update this with the frontend URL later.

     - **ACCESS_SECRET_KEY**, **RESET_PASSWORD_SECRET_KEY**, **VERIFICATION_SECRET_KEY**  
       - You can temporarily set these secret keys as plain strings (e.g., `examplekey`) during deployment. However, you should generate secure keys and update them after the deployment in the **Post-Deployment Configuration** section.

   - Complete the deployment process [here](#post-deployment-configuration).


## Deployment

To enable Continuous Integration through Github Actions, you can use the **prod-backend-deploy.yml** and **prod-frontend-deploy.yml** files. To connect them to GitHub, simply move them to the .github/workflows/ directory.

You can do it with the following commands:
   ```bash
    mv prod-backend-deploy.yml .github/workflows/prod-backend-deploy.yml
    mv prod-frontend-deploy.yml .github/workflows/prod-frontend-deploy.yml
   ```

### Prerequisites
1. **Create a Vercel Token**:  
   - Generate your [Vercel Access Token](https://vercel.com/account/tokens).  
   - Save the token as `VERCEL_TOKEN` in your GitHub secrets.

2. **Install Vercel CLI**:  
   ```bash
   pnpm i -g vercel@latest
   ```
3. Authenticate your account.
    ```bash
   vercel login
   ```
### Frontend Setup

1. Link the nextjs-frontend Project

2. Navigate to the nextjs-frontend directory and run:
   ```bash
   cd nextjs-frontend
   vercel link
   ```
3. Follow the prompts:
   - Link to existing project? No
   - Modify settings? No

4. Save Project IDs and Add GitHub Secrets:
  - Open `nextjs-frontend/.vercel/project.json` and add the following to your GitHub repository secrets:
    - `projectId` → `VERCEL_PROJECT_ID_FRONTEND`
    - `orgId` → `VERCEL_ORG_ID`

### Backend Setup

1. Link the fastapi_backend Project

2. Navigate to the fastapi_backend directory and run:
   ```bash
   cd fastapi_backend
   vercel link --local-config=vercel.prod.json
   ```
   - We have a special configuration than we need to set the --local-config value.
3. Follow the prompts:
   - Link to existing project? No
   - Modify settings? No

4. Save Project IDs and Add GitHub Secrets:
  - Open `fastapi_backend/.vercel/project.json` and add the following to your GitHub repository secrets:
    - `projectId` → `VERCEL_PROJECT_ID_BACKEND`
    - `orgId` → `VERCEL_ORG_ID` (Only in case you haven't added that before)

### Notes
- Once everything is set up, simply run `git push`, and the deploy will automatically take place.
- Ensure you complete the setup for both the frontend and backend separately.
- Refer to the [Vercel CLI Documentation](https://vercel.com/docs/cli) for more details.
- You can find the project_id into the vercel web project settings.
- You can find the organization_id into the vercel web organization settings.

## **Post-Deployment Configuration**

### Frontend
   - Access the **Environment Variables**.  
   - Update the `API_BASE_URL` variable with the backend URL once the backend deployment is complete.

### Backend
   - **Environment Variables** update the following variables with secure values:

     - **CORS_ORIGINS**  
       - Once the frontend is deployed, replace `["*"]` with the actual frontend URL.

     - **ACCESS_SECRET_KEY**  
       - Generate a secure key for API access and set it here.  

     - **RESET_PASSWORD_SECRET_KEY**
       - Generate a secure key for password reset functionality and set it.

     - **VERIFICATION_SECRET_KEY**  
       - Generate a secure key for user verification and configure it.

   - For detailed instructions on how to set these secret keys, refer to the section on [Setting up Environment Variables](#setting-up-environment-variables).

### Database Connection

  TODO: @dcohen add instructions here


## Makefile

This project includes a `Makefile` that provides a set of commands to simplify common tasks such as starting the backend and frontend servers, running tests, building Docker containers, and more.

### Available Commands

You can see all available commands and their descriptions by running the following command in your terminal:

```bash
make help
```

## Important Considerations
- **Environment Variables**: Ensure your `.env` files are up-to-date.
- **Database Setup**: It is recommended to use Docker for running the database, even when running the backend and frontend locally, to simplify configuration and avoid potential conflicts.
- **Consistency**: It is **not recommended** to switch between running the project locally and using Docker, as this may cause permission issues or unexpected problems. Choose one method and stick with it.

## Using DCO to sign your commits

**All commits** must be signed with a DCO signature to avoid being flagged by the DCO Bot. This means that your commit log message must contain a line that looks like the following one, with your actual name and email address:

```
Signed-off-by: John Doe <john.doe@example.com>
```

Adding the `-s` flag to your `git commit` will add that line automatically. You can also add it manually as part of your commit log message or add it afterwards with `git commit --amend -s`.

See [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for more information

### Helpful DCO Resources
- [Git Tools - Signing Your Work](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work)
- [Signing commits
](https://docs.github.com/en/github/authenticating-to-github/signing-commits)

## License

Copyright 2025 FINOS

Distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

SPDX-License-Identifier: [Apache-2.0](https://spdx.org/licenses/Apache-2.0)