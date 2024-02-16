# React Material-UI Users Application with Node.js Server

This project consists of a Node.js server to handle API requests and a React application with Material-UI components. The React application implements two tabs: Users Table and Add User Form.

## Setup Instructions

## Server (Node.js)
Clone this repository to your local machine:
git clone <repository-url>

Navigate to the server directory:
cd <project-directory>/server

Install server dependencies:
npm install

Start the server:
node index.js

## Client (React)
Navigate to the client directory:
cd <project-directory>/client

Install client dependencies:
npm install

Start the development server:
npm start

Open your browser and navigate to http://localhost:3000 to view the React application.

# Server APIs

GET /api/users
Returns mock data of users in JSON format.

POST /api/users/add
Adds a new user to the mock data.

## Usage

## Users Table (Tab 1)
This tab displays a table showing users fetched from the server.
The table is implemented using Material-UI components.
Users data is fetched from the server API /api/users.

## Add User Form (Tab 2)
This tab allows users to add a new user.
It consists of a form with input fields for Name, Email, Age, and City.
Material-UI components are used for input fields.
After filling out the form, users can click on the "Submit" button to add the user using a POST request to the server API /api/users/add.

# Additional Notes
Ensure you have Node.js and npm installed on your machine before running the application.

For production deployment, build the application using npm run build and deploy the generated build files to your hosting platform.
This project uses the following libraries/frameworks:

Node.js
React.js
Material-UI