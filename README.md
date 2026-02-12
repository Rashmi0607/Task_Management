# Task_Management
Task Management Application (MERN + PostgreSQL)

A full-stack Task Management Application built using the MERN stack with PostgreSQL (Sequelize ORM). The application supports user authentication, task creation and management, and a dashboard for visualizing task statistics.


Features

User Authentication (JWT based)
Create, Read, Update, Delete (CRUD) Tasks
Task Status: Todo, In Progress, Completed
Protected APIs
PostgreSQL Database with Sequelize ORM
React Frontend
Dashboard with Chart.js
Form Validation & Error Handling

Tech Stack

Frontend

React.js
Axios
Chart.js
Backend

Node.js
Express.js
PostgreSQL
Sequelize ORM
JWT Authentication

Project Structure

TM/
├── backend/
├── frontend/
└── README.md

 

Backend Setup

cd backend
npm install

 
Create a .env file inside backend:

PORT=5000
DB_NAME=taskdb
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_secret_key

 
Run backend:

npm run dev

 
Backend runs at:

http://localhost:5000

 

Frontend Setup

cd frontend
npm install
npm start

 
Frontend runs at:

http://localhost:3000

 

API Endpoints

Auth

POST /api/auth/register
POST /api/auth/login

 
Tasks (Protected)

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

 

Dashboard

Task statistics are displayed using Chart.js, showing:

Total Tasks
Completed Tasks
In Progress Tasks
Todo Tasks

Evaluation Criteria Covered

✔ API Design ✔ Authentication Flow ✔ Sequelize ORM ✔ State Management ✔ Chart.js Integration ✔ Clean Code Structure


Author

Rashmi HV
