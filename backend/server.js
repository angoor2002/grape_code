const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
const uri = `mongodb+srv://angoorcodes:Pihan123@cluster0.wbxo6rf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error("Error connecting to MongoDB Atlas:", error));



// Import routes
const codeRoutes = require('./routes/codeRoutes');

// Use routes
app.use('/api', codeRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send("Welcome to the Code Judge API");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
