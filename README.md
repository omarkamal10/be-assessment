# Bost Assessment API

A Node.js-based RESTful API for for tracking the uptime of user-specified websites. It will allow a user to enter a URL that they want monitored and receive alerts when those resources go down or come back up. Functionality will be included for sending Email notifications to a user. Users will be able to sign up, sign in.

## Setup

### Installation and Starting up Locally

1. Install node dependencies ➡ `npm install`
2. Create a new database with `bostaDB` name on PostgreSQL
3. Edit the database connection configuration in `.env` file
4. Database initialize ➡ `npm run database:init`
5. Development run ➡ `npm run dev` || Production run ➡ `npm run start`

### NPM scripts

1. npm run docker ➡ Docker runtime environment. (HAS UNRESOLVED ISSUES AT THE MOMENT SO RUN LOCAL ENVIRONMENT)
2. npm run lint ➡ Run linter. (Checking for mistakes)
3. npm run database:reset(To reset DB to original state after initializing)

- I left .env intentionally for you to test it right away and apologies for the poor documentation by hand was in a bit of a hurry :D
- There is a postman collection in the docs folder

### Documentation

1. Postman (collection and environment) are provided in ./docs/Postman folder.
2. Environment variables to be used:

- A token variable -> Ex: "token" with value of token received when logging in
- A url variable -> Ex: "base-URL" with value of "http://127.0.0.1:9000" and for each request add "/api/v1"

- GET,UPDATE checks are made only by user who created the check
