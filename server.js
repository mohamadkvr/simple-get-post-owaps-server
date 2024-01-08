const express = require('express');
const cors = require('cors');
const app = express();
const fs = require("fs")
const port = 4001;

// Middleware for JSON support
app.use(express.json());

// Middleware for CORS support (Allow all origins for demonstration purposes)
app.use(cors({
    origin: 'https://memoryleaks.ir',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  }));
// Define a route for the root URL
app.get('/api/getLogs', (req, res) => {
  fs.readFile("logs.txt", 'utf8', (readErr, existingData) => {
    if (readErr) {
      console.error('Error reading file:', readErr);
      res.status(500).send("error happend");
    } else {
      res.send(existingData);
    }
  });

});

// Define a route to handle JSON data
app.post('/api/addLog', (req, res) => {
  const data = req.body; // Assuming JSON data is sent in the request body
  if(!req.body.log) return res.status(400).json({
      msg:"you have send log propety in body"
  })
// Specify the file path
const filePath = 'logs.txt';

// Read the existing content of the file
fs.readFile(filePath, 'utf8', (readErr, existingData) => {
  if (readErr) {
    console.error('Error reading file:', readErr);
  } else {
    // Modify the existing content (remove the last text)
    const modifiedData = existingData.trim()

    // Append new data to the modified content
    const newData = modifiedData + "\n" + req.body.log;

    // Write the modified content back to the file
    fs.writeFile(filePath, newData, (writeErr) => {
      if (writeErr) {
        console.error('Error writing to file:', writeErr);
      } else {
        console.log('Data has been appended to the file, and the last text has been removed.');
      }
    });
  }
});
  return res.status(201).json({"msg":"your log appended"})
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
