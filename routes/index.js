const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CoinGecko = require('coingecko-api');
const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Setting mongoose
const db = mongoose.connection;

const CoinGeckoClient = new CoinGecko();

// loads index
router.get('/', forwardAuthenticated, (req, res) => {
  res.render('home', { error_log_msg: req.flash('error_log_msg'),
                       error_reg_msg: req.flash('error_reg_msg'),
                       error_sub_msg: req.flash('error_sub_msg'),
                       success_log_msg: req.flash('success_log_msg'),
                       success_logout_msg: req.flash('success_logout_msg'),
                       success_delete_msg: req.flash('success_delete_msg'),
                       success_reg_msg: req.flash('success_reg_msg') });
});
 
// redirect index
router.post('/home', (req, res) => res.redirect('/'));

// loads capitalMarkets
let ii, upI;
router.get('/markets', ensureAuthenticated, async (req, res) => {
  //console.log(req.session.passport.user);
  const params = { order: CoinGecko.ORDER.MARKET_CAP_DESC };
  const data = await CoinGeckoClient.coins.markets({ params });
  JSON.stringify(data);
  ii = 0;
  upI = 7;
  res.render('markets', { user: req.user,
                          crypto: data,
                          initialIterator: ii,
                          upperIterator: upI,
                          error_delete_msg: req.flash('error_delete_msg') });//.toJSON()
});

router.post('/markets/next', ensureAuthenticated, async (req, res) => {
  const params = { order: CoinGecko.ORDER.MARKET_CAP_DESC };
  const data = await CoinGeckoClient.coins.markets({ params });
  JSON.stringify(data);
  ii += 7;
  upI += 7;
  res.render('markets', { user: req.user,
                          crypto: data,
                          initialIterator: ii,
                          upperIterator: upI,
                          error_delete_msg: req.flash('error_delete_msg') });
});

router.post('/markets/previous', ensureAuthenticated, async (req, res) => {
  const params = { order: CoinGecko.ORDER.MARKET_CAP_DESC };
  const data = await CoinGeckoClient.coins.markets({ params });
  JSON.stringify(data);
  if (ii >= 7) {
    ii -= 7;
    upI -= 7;
  }
  res.render('markets', { user: req.user,
                          crypto: data,
                          initialIterator: ii,
                          upperIterator: upI,
                          error_delete_msg: req.flash('error_delete_msg') });
});

// common post markets
router.post('/markets', ensureAuthenticated, async (req, res) => {
  const params = { order: CoinGecko.ORDER.MARKET_CAP_DESC };
  const data = await CoinGeckoClient.coins.markets({ params });
  JSON.stringify(data);
  ii = 0;
  upI = 7;
  res.render('markets', { user: req.user,
                          crypto: data,
                          initialIterator: ii,
                          upperIterator: upI,
                          error_delete_msg: req.flash('error_delete_msg') });//.toJSON()
});

// loads budgetPlanner
router.get('/budgetPlanner', ensureAuthenticated, (req, res) => res.render('budgetPlanner'));

// redirect budgetPlanner
router.post('/budgetPlanner', ensureAuthenticated, (req, res) => res.redirect('budgetPlanner'));

// loads newsReader
router.get('/newsReader', (req, res) => res.render('newsReader'));

// redirect newsReader
router.post('/newsReader', (req, res) => res.redirect('newsReader'));

// loads FAQ
router.get('/FAQ', (req, res) => res.render('FAQ'));

// redirect FAQ
router.post('/FAQ', (req, res) => res.redirect('FAQ'));

// load 404 error page
router.get('*', (req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;