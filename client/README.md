# React Material-UI Users Application

This is a React application built using Material-UI components. It consists of two tabs: Users Table and Add User Form.

## Setup Instructions
Clone this repository to your local machine:
git clone <repository-url>

Navigate to the project directory:
cd <project-directory>

Install dependencies:
npm install

Start the development server:
npm start

Open your browser and navigate to http://localhost:3000 to view the application.

## Usage

# Users Table (Tab 1)
This tab displays a table showing users fetched from the server.
The table is implemented using Material-UI components.
Users data is fetched from the server and displayed in the table.

# Add User Form (Tab 2)
This tab allows users to add a new user.
It consists of a form with input fields for Name, Email, Age, and City.
Material-UI components are used for input fields.
After filling out the form, users can click on the "Submit" button to add the user using a POST request to the server API.

## Additional Notes
Ensure you have Node.js and npm installed on your machine before running the application.

For production deployment, build the application using npm run build and deploy the generated build files to your hosting platform.
This project uses the following libraries/frameworks:

React.js
Material-UI