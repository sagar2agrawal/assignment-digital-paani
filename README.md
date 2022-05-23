# assignment-digital-paani

## Setup .env file
NODE_ENV=""
APP_PORT=
MONGODB_URI=""
REDIS_USERNAME=""
REDIS_PASSWORD="!"
REDIS_HOSTNAME=""
REDIS_PORT=""

## How to get Started with
1. Have a mongodb and redis instance running uri and creds
2. Download the code
3. npm install
4. setup .env with .env-template file
5. npm start
6. Run seed data api
7. send header with key -> user and value -> {"userId": "628b1732980a67a0d7842179", "userRole": "facilityLead", "userFacility": "meta"}

## How to Test
1. Due date in timestamp

## Core parts
1. Structure - Done
2. Code Quality | Liniting | Documentation - Remaining
3. Test - Remaining
4. Complex MongoDB query like getting member with lessLoad in specific facility - Done
5. Jobs for reassinging for overdue tasks - Partial Done (every minute job is there with bull, need to assign logic)
6. Basic Functionality - Middleware, logs, Services, Validation, Configs - Partial Done
7. One command Deployable - Remaining
8. Data Modelling/Indexes - Partial Done


## Big Assumtion notes
1. We are sending the userId for the create, update and delete task, instead of taking user id from JWT
2. Pagination on get all task filtered on priority, due date is skipped due to the task being an assignment
3. For the sake of assignment, we are just putting facility name, as a facility and not creating a seperate collection, where system verifies task facility before task creation
4. We are not adding redis for checking if it a token is present as a blacklisted token (user blocked, deleted, roles changed, password changed etc)
5. It's built in such a way that task can be assinged to only one user
6. For the sake of assingment we have assumed that one person can only be in one company, else we will have to restructure the code/architecture on how to validate a facility lead and user


## Things we are ignoring right now, example below
- Seperating APP and Server for easier testing
- Custom Error Classes for throw errors with specific context, format and data
- Creating branches for each feature and then merged in to dev, then mnerging dev to main branch
- Writing Unit test
- Linting and Prettify is being skipped
- Module/path aliasing is being skipped
- Not Implementing AUTH where user id will be fetched from JWT
- DB connection handeling
- There is no detailed validation on all the inputs
- Documentating everything
- Creating API documentation
