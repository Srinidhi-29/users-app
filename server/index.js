const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock data of users
let users = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    city: 'New York',
    },
    {
    id: uuidv4(),
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 28,
    city: 'San Francisco',
    },
    {
    id: uuidv4(),
    name: 'Mike Johnson',
    email: 'mike@example.com',
    age: 35,
    city: 'Chicago',
    },
    {
      id: uuidv4(),
      name: "Alice",
      email: "alice@gmail.com",
      age: 25,
      city: "Los Angeles",
    },
];

// GET /api/users: Returns mock data of users in JSON format
app.get("/api/users", (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/users/add: Adds a new user to the mock data
app.post("/api/users/add", (req, res) => {
  try {
    const { name, email, age, city } = req.body;
    const id = uuidv4();
    const newUser = { id, name, email, age, city };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
