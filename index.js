const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5001

 app()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    //res.send(req.query.img);
    const img_data = req.query.img;
    res.send({
      'img_data': img_data
    })
    res.render('pages/index'); 
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

//const app = express();
//const port = 5001;

//app.get("/", function (req, res) {
//  res.send("Hello World!");
//});

//app.listen(port, function () {
//  console.log(`Example app listening on port ${port}!`);
//});

//app.use(express.static(path.join(__dirname, 'public')))
//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'ejs')