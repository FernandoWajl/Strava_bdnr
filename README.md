# Strava

## _Activities and users implementations_

Both implementations use certain databases so you have t make sure to have access to those before executing the service.

To interact with the servers endpoints there is a [postaman collection avaiblable ](postman_collection)

## Activities

Activities uses Cassandra and MongoDb, you shold have acccess to the the connections settings for those databases.

To connect to you DB you should use enviroment variables or the defualt values. The available ones are

- CONTACT_POINTS (default ["127.0.0.1"])
- CASSANDRA_LOCAL_DATA_CENTER (default "datacenter1")
- CASSANDRA_KEYSPACE (default "bdnr")
- MONGO_DB_ADDRESS (default "mongodb://127.0.0.1:27017/strava_db")
- PORT (default "3000")

In order to run the service

- Go to the activities directory
- Run `npm install`
- Run `npm start`

## Users

Activities uses MongoDb, you shold have acccess to the the connections settings for that database.

To connect to you DB you should use enviroment variables or the defualt values. The available ones are

- DB_ADDRESS (default "mongodb://127.0.0.1:27017/strava_db")
- PORT (default "3892")

In order to run the service

- Go to the activities directory
- Run `npm install`
- Run `npm start`
