const express = require('express');
const path = require('path');
const pageRouter = require('./routes/pages');

const app = express();

//body parser
app.use(express.urlencoded({extended:false}));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routers
app.use('/', pageRouter);

//404 error
app.use((req,res,next) => {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

//error handling
app.use((req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

//set up the server
app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});

module.exports = app;