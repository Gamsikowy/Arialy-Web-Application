const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const User = require('../models/User');
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const appMailer = require('../mailers/appMailer');
const newsletterMailer = require('../mailers/newsletterMailer');
const { forwardAuthenticated } = require('../config/auth');
const { assert } = require('console');

// setting mongoose
const db = mongoose.connection;

// segister process
router.get('/register', forwardAuthenticated, (req, res, next) => res.redirect('markets'));

// login Process
//router.get('/login', forwardAuthenticated, (req, res, next) => res.redirect('markets'));
router.get('/login', forwardAuthenticated, (req, res, next) => res.render('markets'));

// redirect home
router.post('/register', forwardAuthenticated, async (req, res) => {
    const { name, surname, password, password2, phone, pesel, email, date, sex, terms } = req.body;
    
    // checking if there are empty fields
    if (!name || !surname || !password || !password2 || !phone || !pesel || !email || !date || !sex || !terms) {
      req.flash('error_reg_msg', 'Please enter all fields.');
      res.render('home', { error_reg_msg: req.flash('error_reg_msg'), name, surname, phone, pesel, date, sex });
      return res.end();
    }

    // checking the length of the pesel
    if (pesel.length !== 11) {
      req.flash('error_reg_msg', 'The provided pesel should contain 11 digits.');
      res.render('home', { error_reg_msg: req.flash('error_reg_msg'), name, surname, phone, pesel, date, sex });
      return res.end();
    }

    // checking that the passwords are the same
    phone.replace(/\s/g,'');
    if (password != password2) {
      req.flash('error_reg_msg', 'Passwords do not match.');
      res.render('home', { error_reg_msg: req.flash('error_reg_msg'), name, surname, phone, pesel, date, sex });
      return res.end();
    }
  
    // checking the correctness of the password
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passRegex.test(password)) {
      req.flash('error_reg_msg', 'Password must be at least 8 characters, make sure it contains one capital letter, one small letter and number.');
      res.render('home', { error_reg_msg: req.flash('error_reg_msg'), name, surname, phone, pesel, date, sex });
      return res.end();
    }

    // age check
    let newDate = new Date(date);
    let birthYear = newDate.getFullYear();
    let birthMonth = newDate.getMonth();
    let birthDay = newDate.getDate();

    if (new Date(birthYear + 18, birthMonth, birthDay) > new Date()) {
      req.flash('error_reg_msg', 'You must be at least 18 years old to create an account.');
      res.render('home', { error_reg_msg: req.flash('error_reg_msg'), name, surname, phone, pesel, date, sex });
      return res.end();
    }
  
    // adding a user to the database and password encryption
    User.findOne({ $or: [{ email: email }, { pesel: pesel }]}).then(user => {
      if (user) {
        req.flash('error_reg_msg', 'Provided email/pesel already exists.');
        res.render('home', { error_reg_msg: req.flash('error_reg_msg'), name, surname, phone, pesel, date, sex });
        return res.end();
      } else {
          const newUser = new User({
              name,
              surname,
              password,
              phone,
              pesel,
              email,
              date,
              sex,
              terms
          });

          // password encryption
          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (erro, hash) => {
                if (erro) throw erro;
                newUser.password = hash;
                newUser.save().then(() => {
                  appMailer.applicationNotify({
                    email: email,
                    data: { name: name }
                });

                    req.flash('success_reg_msg', 'The account has been successfully created.');
                    res.render('home', { success_reg_msg: req.flash('success_reg_msg'), name, surname, phone, pesel, date, sex });
                    return res.end();
                  }).catch(e => console.log(e));
              });
            });
          }
        }).catch(err => console.log(err));
});

// login process
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/markets',
      failureRedirect: '/',
      failureFlash: true
    })(req, res, next);
  });

// logout process
router.post('/logout', (req, res) => {
    req.logout();
    req.flash('success_logout_msg', 'You are logged out');
    res.render('home', { success_logout_msg: req.flash('success_logout_msg') });
    return res.end();
  });
  
// subscribe to the newsletter
/*router.post('/subscribe', (req, res) => {
  const { newsletterName, newsletterSurname, newsletterEmail } = req.body;
  
  if (!newsletterName || !newsletterSurname || !newsletterEmail) {
    req.flash('success_reg_msg', 'Fill all fields');
    res.render('home', { success_sub_msg: req.flash('success_sub_msg') });
    return res.end();
  } else {
    newsletterMailer.applicationNotify({
      email: newsletterEmail,
      data: { 
        name: newsletterName,
        surname: newsletterSurname
      }
    }).then(response => {
      if (response[0].statusCode === 200) {
        req.flash('success_sub_msg', 'You have been subscribers to our newsletter');
        res.render('home', { success_sub_msg: req.flash('success_sub_msg') });
        return res.end();
      } else {
        req.flash('error_sub_msg', 'We are sorry but we cannot subscribe you to the newsletter');
        res.render('home', { error_sub_msg: req.flash('error_sub_msg') });
        return res.end();
      }
    }).catch(err => console.log(err));
  }
});*/

// recaptcha support
router.post('/captcha', async (req, res) => {
  if (!req.body.captcha) {
    req.flash('error_reg_msg', 'Captcha validation failed');
    res.render('home', { error_msg: req.flash('error_reg_msg') });
    return res.end();
  }
  // pass your secret key
  const secretCaptchaKey = '6LcsGHEaAAAAAPsIQ8xEBEZZZ75YXi3UD8ylzrbj';
  const query = stringify({
    secret: secretCaptchaKey,
    response: req.body.captcha,
    remoteip: req.socket.remoteAddress
  });
  const verify = `https://google.com/recaptcha/api/siteverify?${query}`;

  // request to verifyURL
  const body = await fetch(verify).then(response => response.json());

  if (!body.success && body.success !== undefined) {
      req.flash('error_reg_msg', 'Captcha validation failed');
      res.render('home', { error_reg_msg: req.flash('error_reg_msg') });
      return res.end();
    }

    return res.json({ success: true, msg: 'Captcha passed' });
});

// delete user
router.delete('/delete/:email', async (req, res) => {
  const userEmail = req.params.email;
  User.findOneAndDelete({ email: userEmail }, (err) => {
    if (err) {
      const error = new Error('Cannot delete user');
      error.status = 500;
      next(error);
    }
  })
  .then(() => User.findOne({ email: userEmail }))
  .then((result) => {
    if (result !== null) {
      req.flash('error_delete_msg', 'The account cannot be deleted properly');
      res.render('markets', { error_delete_msg: req.flash('error_delete_msg') });
      return res.end();
    } else {
      res.redirect('/');
    }
  })
});

module.exports = router;