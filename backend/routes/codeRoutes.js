const express = require('express');
const router = express.Router();
const CodeSnippet = require('../models/CodeSnippet');

// Mark the route handler as async
router.post('/saveCode', async (req, res) => {
    const { code, name } = req.body;

    console.log("Code Snippet Received:");
    console.log("Name:", name);
    console.log("Code:", code);

    try {
        // Create a new code snippet document
        const newSnippet = new CodeSnippet({ name, code });
        
        // Save the new code snippet to the database
        await newSnippet.save();

        // Respond with success message
        res.status(200).json({ message: 'Code saved successfully', snippet: newSnippet });
    } catch (error) {
        console.error("Error saving code:", error);
        res.status(500).json({ message: 'Error saving code', error });
    }
});

module.exports = router;
