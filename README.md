Structure to a project using only SOLID structure 

based by Rocketseat course ignite 

# App

GymPass style app.

## About

This project goals practice the concepts of SOLID, Clean Archteture and TDD 
using Node.JS, Typescript and PostgreSQL.

## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify.js](https://fastify.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

## RFs (Functional Requirements)

- [x] It should be possible to register an user;
- [x] It should be possible to authenticate an user;
- [x] It should be possible to get the profile of a logged-in user;
- [x] It should be possible to get the number of check-ins submited by the logged-in user;
- [x] It should be possible for the user to get their check-in history;
- [x] It should be possible for the user to search for nearby gyms (up to 10km);
- [x] It should be possible for the user to search for gyms by name;
- [x] It should be possible for the user to check in at a gym;
- [x] It should be possible to validate a user's check-in;
- [x] It should be possible to register a gym;

## RNs (Business Rules)

- [x] A user should not be able to register with a duplicate email;
- [x] A user cannot submit two check-ins on the same day;
- [x] A user cannot check in if they are not near (100m) the gym;
- [x] A check-in can only be validated up to 20 minutes after it is created;
- [x] A check-in can only be validated by administrators;
- [x] A gym can only be registered by administrators;

## RNFs (Non-functional Requirements)

- [x] The user's password must be encrypted;
- [x] The application's data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);

