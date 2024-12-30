const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// إعداد التخزين لـ Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// التعامل مع تحميل ملف الصوت
app.post('/upload', upload.single('audio'), (req, res) => {
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
