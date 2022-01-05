# Vue NestJs Boilerplate

A boilerplate for a Full-Stack application using NestJS 8 for the backend and Vue 3 for the frontend.

It includes:

- :closed_lock_with_key: Authentication (including oAuth for Google and Twitter, Email verification, password reset etc.)
- :cd: Rich configuration possibilities via environment variables
- :whale: A dockerized environment (usage not mandatory but recommended): Backend & frontend server, Postgres, pgadmin, Redis, Mailhog
- :e-mail: Sending email + HTML email templates
- :bug: Debugging setup for VS Code for the backend
- :cloud: TailwindCSS integration

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

## Exploring the app

Once you're set up, you can visit your frontend URL (usually `http://localhost:8080`). But there won't be too much to see. So let's move on to `/register`! There, you'll be able to register for an account. Once you finish that, you will be redirected to `/dashboard`. You can only access this route when you are logged in.

## Authentication :closed_lock_with_key:

The app comes with a couple of different ways a user can login/register:

- The traditional (local) way by providing an email address and a password
- Google oAuth
- Twitter oAuth

### Authentication backend :arrow_left:

The authentication on the backend is primarily handled in the `/backend/src/auth` module. However, it also requires the `/backend/src/user` and `/backend/src/mail` module to work properly.

#### The user module

The `user` module is solely concerned with the user entity that is stored in the database. This means:

- Defining the user entity (`/backend/src/user/user.entity.ts`)
- Providing a service to query the user table (`/backend/src/user/user.service.ts`)

#### The auth module

The `auth` module handles all the authentication and authorization of users. This means:

- (oAuth) Login & registration
- Authorization / protecting routes
- Email verification
- Password reset

The module uses [Passport](https://www.passportjs.org/) under the hood with a session based authenctication approach. It takes advantage of the following strategies:

- Local strategy
- Google Passport oAuth 2.0
- Twitter Passport oAuth

The boilerplate also takes advantage of the thin wrapper packages that NestJS offers for passport. Thus, the authentication/authorization logic primarily happens in `/backend/src/auth/controllers`, `/backend/src/auth/guards` and `/backend/src/auth/strategies`

**Sessions**
Passport offers a variety of different authentication strategies. This boilerplate uses a session based authentication approach, where the sessions are stored in the Postgres database in a `sessions` table. To achieve this, the app uses the `express-session` and `connect-typeorm`packages.

**oAuth**

> :bulb: **You must register your apps on Google and Twitter**
> You can only use oAuth if you register your apps on Google and Twitter beforehand and paste the correct values into the /backend/.env file.

OAuth gets kind of tricky when you have a decoupled frontend and backend. Here is how the app handles it:

- On the frontend, click on a social login button
- This button redirects you to `<backend-domain>/auth/twitter` or `<backend-domain>/auth/google`
- These domains, in turn, automatically redirect you to the respective authentication page of the OAuth provider
- After successfully authenticating there, the authentication provider redirects you back to `<backend-domain>/auth/twitter/callback` or `<backend-domain>/auth/google/callback`.
- There, passport does its magic and retrieves the corresponding user information by using the access token from the url to ping the API of the OAuth provider.
- Next, a user with the corresponding email address will be searched in the database and the user will either be logged in or a new user will be created.
- Finally, the user gets redirected to `<frontend-domain>/auth/twitter/callback` or `<frontend-domain>/auth/google/callback`.

> :warning: **The callback matters**
> Please make sure to enter a callback in the form of <backend-domain>/auth/{twitter_or_google}/callback in the settings of the respective providers. The boilerplate wont work correctly otherwise.

#### The mail module

The mail `/backend/src/module` is required for sending email verification and password reset mails. It leverages the awesome [@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer) package, which enables the following things:

- Creating HTML-Email templates with handlebars
- Dynamically injecting values into these templates
- A nicely formatted API to actually send the emails

**Templates**
Email templates live under `/templates`. by default, you'll find two. One email verification/welcome template and a password reset template. They are written in handlebars so that we can later dynamically inject values.
The methods for actually sending the emails live in `mail.service.ts`.
So, if you want to create and send additional mails, you need to do the following:

- Create a new template under `/templates`
- Create a new method in `mail.service.ts`. In the `context` option, choose the values for the variables you declared in the template file
- Call the newly created method somewhere else in your code in order so send the mail.
