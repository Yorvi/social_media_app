const express = require('express');
const path = require('path');

const app = express();

//body parser
app.use(express.urlencoded({extended:false}));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//index
app.get('/', function(req, res) {
  res.render('index');
})


//set up the server
app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});

module.exports = app;