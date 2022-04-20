const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');//?
const methodOverride = require('method-override');//?
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('dotenv').config({ path: '.env' });

const app = express();

require('./config/passport')(passport);

app.use(cookieParser(process.env.SESSION_SECRET || 'secret'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
    // cookie: { 
    //   maxAge: 300000, // 5min * 60s * 1000
    //   secure: true 
    // }
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(methodOverride('_method'));

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/funcionality'));

const mongoURI = require('./config/database').MongoURI;
mongoose.connect(mongoURI, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Mongoose connected'));
db.on('disconnected', () => console.log('Mongoose disconnected'));
process.on('SIGINT', () => { 
    db.close(() => {
        console.log('Mongoose default connection is disconnected due to application termination');
        process.exit(0);
      });
});

app.use((req, res, next) => {
  res.locals.success_reg_msg = req.flash('success_reg_msg');
  res.locals.success_logout_msg = req.flash('success_logout_msg');
  res.locals.success_log_msg = req.flash('success_log_msg');
  res.locals.success_sub_msg = req.flash('success_sub_msg');
  res.locals.success_delete_msg = req.flash('success_delete_msg');
  res.locals.error_delete_msg = req.flash('error_delete_msg');
  res.locals.error_log_msg = req.flash('error_log_msg');
  res.locals.error_reg_msg = req.flash('error_reg_msg');
  res.locals.error_sub_msg = req.flash('error_sub_msg');
  next();
});

let indexRouter = require('./routes/index');
let userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.error('Error: ' + error.message);
  console.error('With status: ' + error.status);
  res.render('404');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
