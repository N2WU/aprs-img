const { spawn } = require('child_process');
const got = require('got');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

const sharp = require("sharp");

async function getImage() {
  try {
    const byteArray = Buffer.from(/* Your byte array here */); // Replace this with your actual byte array
    sharp(byteArray)
      .toFile('output.jpg') // Specify the desired output file name and format
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


test('responds to requests', (t) => {
  t.plan(4);

  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    (async () => {
      const response = await got('http://127.0.0.1:5000');
      // stop the server
      child.kill();
      // No error
      t.false(response.error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(response.body.indexOf("<title>Node.js Getting Started on Heroku</title>"), -1);
      t.notEqual(response.body.indexOf("Getting Started on Heroku with Node.js"), -1);
    })();
  });
});
