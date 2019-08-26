**Population API**

This is a node.js app built using below technologies to track locations and their populations.

Express.js: A Fast, opinionated, minimalist web framework for node which was used in routing this application.

BodyParser: This module was used to collect search data sent from the client side to the routing page.

Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js

MongoDB: PostgreSQL is a powerful, open source object-relational database system.

**Prerequisites**

Install (if not installed)

- nodejs
- mongodb
- mongoDB compass

**Installation**

Cd into your folder
Clone this repository.
Create a .env file using the .env-default as a guide.
- npm install to install all dependencies.
- npm start: to start the app in development mode.
- npm test: to runs all the tests

**Features of the API**

A user can:

- create a new location
- get all locations
- update a location
- delete a location

**API Documentation**
```
POST a new location /api/locations
Request
{
	"name": "Nyeri",
	"femaleCount": 120,
	"maleCount": 110,
	"parentId": "5d63f8516974e90c16a51ff3"
}

Response
{
    "_id": "5d63f8a96974e90c16a51ff6",
    "name": "Nyeri",
    "femaleCount": 120,
    "maleCount": 110,
    "population": 230,
    "linkedLocation": "5d63f8516974e90c16a51ff3",
    "__v": 0
}

GET all locations /api/locations
Response
[
    {
        "_id": "5d6326c2757996b3389a6c42",
        "name": "Kisumu",
        "femaleCount": 120,
        "maleCount": 110,
        "population": 230,
        "linkedLocation": "5d6264da1d8c4c7580db9a34",
        "__v": 0
    },
    {
        "_id": "5d632968667c22b54446ee46",
        "name": "Kitale",
        "femaleCount": 12,
        "maleCount": 10,
        "population": null,
        "__v": 0,
        "linkedLocation": "5d632968667c22b54446ee46"
    },
    {
        "_id": "5d632a3c603fb5b58aa22384",
        "name": "gatundu",
        "femaleCount": 20,
        "maleCount": 12,
        "population": 32,
        "__v": 0
    }
]

PUT a location (update) /api/locations/:locationId
Request
{
	"femaleCount": 90,
	"maleCount": 32,
	"parentId": "5d632968667c22b54446ee46"
}

Response
{
    "message": "Successfully updated"
}

DELETE a location /api/locations/:locationId
Response
{
    "message": "Successfully deleted"
}
```