const express = require('express');
const router = express.Router();

//index page
router.get('/', (req,res,next) => {
  res.render('index', {title:"My App"});
});

//home page
router.get('/home', (req,res,next) => {
  res.send('Hello World!');
});

//login data
router.post('/login', (req,res,next) => {
  res.json(req.body);
});

//register data
router.post('/register', (req, res, next) => {
  res.json(req.body);
});

module.exports = router;