const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const { postData } = require('./routes');
const { certificate } = require('./routes/certificate');

const app = express();
const port = 4000;

mongoose.connect('mongodb://localhost:27017/testingData', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



app.set('view engine', 'ejs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('excelFile');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload, postData);
app.get('/certificate', certificate);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const xlsx = require('xlsx');

// const app = express();
// const port = 3000;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/excelToJsonDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Define a MongoDB Schema (Example)
// const excelDataSchema = new mongoose.Schema({
//   jsonData: Object,
// });

// const ExcelData = mongoose.model('ExcelData', excelDataSchema);

// app.set('view engine', 'ejs');

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single('excelFile');

// app.get('/', (req, res) => {
//   res.render('index');
// });

// app.post('/upload', upload, async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName];
//   const jsonData = xlsx.utils.sheet_to_json(sheet);

//   try {
//     const newExcelData = new ExcelData({ jsonData });
//     await newExcelData.save();
//     res.redirect('/data'); // Redirect to show saved data
//   } catch (error) {
//     res.status(500).send('Error saving data to MongoDB.');
//   }
// });

// app.get('/data', async (req, res) => {
//   try {
//     const savedData = await ExcelData.find({});
//     res.render('data', { savedData }); // Render a template to display saved data
//   } catch (error) {
//     res.status(500).send('Error retrieving data from MongoDB.');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
