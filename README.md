# wt1wa-proj2-poi-backend

## current rest api

* POST /authenticate { "name": "username", "password": "user password"}

* GET /db_reset

* POST /user { name, password, email }

* GET /tags  (opt. [ ids ])

* GET /comments  (opt. [ ids ])

* GET /user/:id

All following routes **require a valid token**. You can send it as a query param or as a body param.

* POST /tag {"name": "name"}

## server how to

* make sure you have mongodb installed listen on default port
* have a db called "wt1wadb"

* run server with `node server.js`

* reset db by calling rest endpoint "db_reset"

* if you want to install "mongo-express" via npm globally to have a mongodb-gui
* run mongo-express like this `node /usr/local/lib/node_modules/mongo-express/app`
