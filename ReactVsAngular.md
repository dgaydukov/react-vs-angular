# React vs Angular

Many people ask me the difference between angular and react, and what is best suits for their project.
That's why i decided to write this article

## App example

To demonstrate pros and cons of both technology i will make one project in both, and we will see, how technologies solve these issues
* Event binding
* ...

## App Structure

An an example i decided to write simple adminPanel.

adminPanel will consist of the following components:
```
-auth
--mulit-step-register
--login
-mainpage
-user-roles crud
-catalog crud
-transactions list
```
To demonstrate all power, we need a backend server, that will be located in /backend/db, and be a simple json file. For this, we will use [json_server](https://www.npmjs.com/package/json-server)
```
API (json_server, db.json/restore.json)
POST: /register
POST: /register/confirm
POST: /login

GET: /catalog
GET: /catalog/:id
POST: /catalog/
PUT: /catalog/:id
DELETE: /catalog/:id

GET: /transactions
GET: /transactions/:id
```