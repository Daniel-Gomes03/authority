This was a test done for the Authority

Follow the steps below to run this project

## Getting Started

First, install the dependencies:

```bash
yarn
```

## Developer setup with Docker

If you are running on localhost, you can use a dockerized database:
`docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=authoritytest -p 5432:5432 -d postgres`

After configuring the database and creating the docker image you can run the command: `yarn typeorm migration: run` to create the tables.

If you don't have Docker on your machine, you can follow the step-by-step instructions in the [DOCUMENTATION](https://docs.docker.com/)


## Running the Project

Then you can can run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Endpoints

Create new user
POST `http://localhost:3000/api/users`

```
{
  "name": "Daniel Gomes",
  "email": "daniel@email.com",
  "password": "12345678"
}
```

Sign in
POST `http://localhost:3000/api/users/signIn`

```
{
  "email": "jhondoe@email.com",
  "password": "12345678"
}
```
