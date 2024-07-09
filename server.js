var express = require('express');
var app = express();
var path = require('path');
const multer = require('multer');
const fs = require('fs');

// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define the route for the home page
app.get('/home', function (req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/', function (req, res) {
   res.redirect('/home');
});

app.get('/uploads', (req, res) => {
    // Fetch and display the list of uploaded files
    const uploadedFiles = fs.readdirSync(path.join(__dirname, 'uploads/'));
    console.log(uploadedFiles, 'uploadedFiles');
    res.render('uploads', { files: uploadedFiles });
});

const upload = multer({ dest: path.join(__dirname, 'uploads/') });
app.post('/upload', upload.array('files', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
      res.send({ files: req.files });
    });

app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  console.log(filePath, 'filePath');
  res.sendFile(filePath);
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Ứng dụng Node.js đang hoạt động tại địa chỉ: http://%s:%s", host, port)
});