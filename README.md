# School Management System
Back-end coding test for LittleLives.

## Prerequisite:
- Ubuntu / MacOS
- Docker and Docker-compose installed
- Postman (recommended) / curl

## APIs:

### Authentication

Each request must have token in the field Authorization in header.

There are 4 roles and after login successfully, user will be provided the token.

For example:
| Role | Token|
|----- |------|
|Admin |Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkFkbWluIiwiaWF0IjoxNTk0MzY4NDI1fQ.zifHlWv4ojZ92gm1CgCXlXAZR19Y5B0mlraSuBhcRgs|
|Teacher |Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlRlYWNoZXIiLCJpYXQiOjE1OTQzNjc2NTB9.bKTbyzoUmm_oXTGH4FI0DztSXtqk9eR6dLg9p_5wYZE|
|Owner |Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6Ik93bmVyIiwiaWF0IjoxNTk0MzY3ODM5fQ.OiBH9UcQlopA881T193sw0rEXkAc-3yRqCfnslcgvu8|
|HQ |Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IkhRIG93bmVyIiwiaWF0IjoxNTk0NjE0MzM1fQ.7Q6D72Xq7kFjPS21uXCPkntthGSHiDT_UBjbj4iDbHI|

### Tracking

- GET /api/v1/tracking/teacher
- GET /api/v1/tracking/hq
- GET /api/v1/tracking/hq/school/:schoolId
- GET /api/v1/tracking/owner
- GET /api/v1/tracking/owner/class/:classId

### Format
Currently, 2 formats are supported
- JSON (default)
- CSV

Specify the format by using format parameter.

```
api/v1/tracking/teacher?format=csv
```

## Database:
- Postgres and [table diagram](https://dbdiagram.io/d/5f0d61300425da461f04a304)
- Fake data is loaded into tables when service starts. More detail at file **/src/init_db.js**

## Dependencies:
- expressjs as backend framework
- fast-csv to manipulate csv
- jsonwebtoken and express-jwt to create and validate token
- pg and pg-hstore to connect postgres database
- sequelize as a object relational mapping

## Areas for Improvement:
- Add unitest, integration test, ...
- Add password hashing
- Add Create - Update - Delete operations
- Using log module (eg. winston) instead of console.log
- Seperate dev and prod environment

## How to Run
*Note: Below steps for Ubuntu machine.*

### Start server

Clone the repository, change to project root folder and run command

```
## Change directory to root folder
cd school_management_system/

## Start services
docker-compose up --build
```
Now we can access the server at localhost port 3000

```
app_1       | 
app_1       | > school_management_system@1.0.0 dev /usr/src/app
app_1       | > nodemon -L src/index.js
app_1       | 
app_1       | [nodemon] 2.0.4
app_1       | [nodemon] to restart at any time, enter `rs`
app_1       | [nodemon] watching path(s): *.*
app_1       | [nodemon] watching extensions: js,mjs,json
app_1       | [nodemon] starting `node src/index.js`
app_1       | Initialize data
app_1       | Server is listening on port 3000
```

### Request with Postman

Run Postman and import collection from file **postman.json** in root folder. You can make request in the collection.

### Request with curl (Optional)

- As a teacher
```
curl --location --request GET 'http://localhost:3000/api/v1/tracking/teacher?format=csv' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlRlYWNoZXIiLCJpYXQiOjE1OTQzNjc2NTB9.bKTbyzoUmm_oXTGH4FI0DztSXtqk9eR6dLg9p_5wYZE'
```

- As a HQ owner (Paid)
```
curl --location --request GET 'http://localhost:3000/api/v1/tracking/hq?format=csv' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IkhRIG93bmVyIiwiaWF0IjoxNTk0NjE0MzM1fQ.7Q6D72Xq7kFjPS21uXCPkntthGSHiDT_UBjbj4iDbHI'
```
- As a HQ owner (Free)
```
curl --location --request GET 'http://localhost:3000/api/v1/tracking/hq/school/2?format=csv' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6IkhRIG93bmVyIiwiaWF0IjoxNTk0NjE0MzM1fQ.7Q6D72Xq7kFjPS21uXCPkntthGSHiDT_UBjbj4iDbHI'
```

- As an Owner (Paid)
```
curl --location --request GET 'http://localhost:3000/api/v1/tracking/owner?format=csv' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6Ik93bmVyIiwiaWF0IjoxNTk0MzY3ODM5fQ.OiBH9UcQlopA881T193sw0rEXkAc-3yRqCfnslcgvu8'
```

- As an Owner (Free)
```
curl --location --request GET 'http://localhost:3000/api/v1/tracking/owner/class/1?format=csv' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6Ik93bmVyIiwiaWF0IjoxNTk0MzY3ODM5fQ.OiBH9UcQlopA881T193sw0rEXkAc-3yRqCfnslcgvu8'
```