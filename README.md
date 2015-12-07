# wt1wa-proj2-poi-backend

## current rest api

* POST /authenticate { "name": "username", "password": "user password"}

All following routes **require a valid token**. You can send it as a query param or as a body param.

* GET /db_reset

* POST /tag {"name": "name"}

## server how to

* make sure you have mongodb installed listen on default port
* have a db called "wt1wadb"

* run server with `node server.js`

* reset db by calling rest endpoint "db_reset"

* if you want to install "mongo-express" via npm globally to have a mongodb-gui
* run mongo-express like this `node /usr/local/lib/node_modules/mongo-express/app`
