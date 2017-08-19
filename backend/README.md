# Backend Server

## Technology used

To demonstrate all power, we need a backend server, that will be located in /backend/db.json, and be a simple json file.
For this, we will use [json-server](https://www.npmjs.com/package/json-server)
The point of Backend Server is to have stable REST API to test our Frontend solutions

## Run

In order to run backend server execute following steps
```
cd backend
npm i
npm start
```


## REST API
```
POST: /register
POST: /register/confirm
POST: /login

GET: /products
GET: /products/:id
POST: /products
PUT: /products/:id
DELETE: /products/:id

GET: /faq
GET: /faq/:id
POST: /faq
PUT: /faq/:id
DELETE: /faq/:id

```