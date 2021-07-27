var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require("../database/models");
var User = db.user;
const { Op } = require("sequelize");

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  function (username, passowrd, done) {
    User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: username }
        ]
      },
      logging: false
    })
    .then(data => {
      if(data.checkPassword(passowrd)){
        return done(null, data, null);
      } else {
        return done(null, false, {
          message: "Invalid username/email or password"
        })
      }
    })
    .catch(err => {
      console.log(err);
      return done(err, false, {
        message: "Error logging in"
      })
    })
  }
));