const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');

const app = express();

// Setup Multer to handle uploads with any file type
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to avoid filename clashes
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Limit to 50MB per file (can be changed)
});

// Serve the static files (frontend)
app.use(express.static('public'));

// Upload API endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    try {
        // Example: Sending the uploaded file to an external platform (like Frezra or Catbox)
        const response = await axios.post('https://frezra.com/user/api.php', {
            file: filePath, // You can modify this to send the actual file data or path
        });

        if (response.data.success) {
            res.json({ success: true, url: response.data.url });
        } else {
            res.json({ success: false, error: 'Upload failed' });
        }
    } catch (error) {
        console.error('Error during upload:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
