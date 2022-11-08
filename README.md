# Setting up the project

## Prerequesites:
- node.js
- npm (comes with node.js installer)
- yarn
- docker
- the will to live

## Steps

1. Clone the repository
2. Ask Warren for the .env file, which contains all the credentials.
3. Run "yarn" in terminal to install dependencies 
4. Run "docker-compose up" in terminal
5. Run "yarn prisma db push"
6. Run "yarn prisma generate"
7. Run "yarn dev" to run dev server and go to localhost:3000 to look at website

## Important!!!
Everytime you want to startup the server, you have to start up the db with "docker-compose up", then start the server with "yarn dev"

If you make changes to the prisma.schema file, you have to sync changes with 3 commands
- yarn prisma migrate reset
- yarn prisma generate
- yarn prisma db push

Have fun!
