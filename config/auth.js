module.exports = {
    ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_log_msg', 'Please log correctly in to view that resource');
      //res.render('home', { error_msg: req.flash('error_msg') });
      res.redirect('/');
    },
    forwardAuthenticated: (req, res, next) => {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('dashboard');      
    }
  };