const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const name = req.cookies.username;
  if (!name) {
    res.redirect('hello')
  } else {
    res.render('index', { name });
  }
});

router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (!name) {
    res.render('hello');
  } else {
    res.redirect('/')
  }
});

router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

module.exports = router;
