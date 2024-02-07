const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://root:example@mongodb:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin', // MongoDB authentication source
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a Mongoose schema and model
const exampleSchema = new mongoose.Schema({
  message: String,
});

const Example = mongoose.model('Example', exampleSchema);

// Route for testing database connection
app.get('/test-db-connection', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send('Database connection is successful!');
  } catch (error) {
    console.error('Error testing database connection:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling POST requests
app.post('/api/data', async (req, res) => {
  try {
    const { message } = req.body;

    // Create a new document in the Example collection
    const newExample = new Example({ message });
    await newExample.save();

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route for handling GET requests
app.get('/api/data', async (req, res) => {
  try {
    // Retrieve all documents from the Example collection
    const data = await Example.find();
    res.json(data);
  } catch (error) {
    console.error('Error handling GET request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, How are you version6');
});