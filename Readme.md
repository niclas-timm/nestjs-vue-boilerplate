# Vue NestJs Boilerplate

A boilerplate for a Full-Stack application using NestJS 8 for the backend and Vue 3 for the frontend.

It includes:

- :closed_lock_with_key: Authentication (including oAuth for Google and Twitter, Email verification, password reset etc.)
- :cd: Rich configuration possibilities via environment variables
- :whale: A dockerized environment (usage not mandatory but recommended): Backend & frontend server, Postgres, pgadmin, Redis, Mailhog
- :e-mail: Sending email + HTML email templates
- :bug: Debugging setup for VS Code for the backend

# Quick start

## Install dependencies

After cloning or downloading the repo, you first need to install the dependencies on both the backend and frontend:
`cd backend; npm install`
`cd ../frontend; npm install`

## Environment variables

You can configure large parts of the app via environment variables. There are three environment files:

- :arrow_left: Backend environment
- :arrow_right: Frontend environment
- :whale: Docker environment (optional)

### Backend

Execute the following commands:

```
cd backend && cp .env.example .env
```

Fill in the values as needed. If you plan to use the **dockerized** environment provided in this repo, there is **no need to change the database and email configuration**

### Frontend

Navigate into the frontend directory and execute the following commands:

```
cp .env.local.example .env.local
```

There is not much to do, actually. Just make sure that you enter the right `VUE_APP_API_URL` without a trailing slash. By default, NestJS runs on `http://localhost:3000`, so you probably don't need to change the default value in `.env.local`.

### Docker environment (optional)

> :bulb: **Not using Docker?**
> You can ignore this section if you don't want to use Docker for your development environment.

First, in the root directory, execute:

```
cp .env.example .env
```

Afterwards, you can adjust the values as you wish. They will be used in the `docker-compose.yml`file for configuring your containers. However, you can also stick to the default values as they will get the job done :muscle: .

> :warning: **Docker containers not suited for production**
> The provided Docker configuration is not secure enough for a production environment. It is only supposed to be used during development.
