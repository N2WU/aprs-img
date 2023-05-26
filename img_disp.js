const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001
const sharp = require("sharp");
//const env = Object.assign({}, process.env, {PORT: 5000});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', function(req) {
  const img_url = req.query.img;
});

// Do thing with img_url, 'server should respond back with
// formatted image
async function getImage() {
  try {
    const byteArray = img_url;
    sharp(byteArray)
      .toFile('public/images/output.jpg') // Specify the desired output file name and format
      .then(() => {
        console.log('Image processed successfully');
      })
      .catch(err => {
        console.error('Failed to process image:', err);
      });
  } catch (error) {
    console.log(error);
  }
}

getImage();

app.get('/', function(res) {
  res.sendFile(__dirname,'index.html')
});

