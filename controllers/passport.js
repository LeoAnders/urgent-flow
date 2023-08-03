const User = require("../models/User");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
      // Match User
      User.findOne({ 
        username: username
       })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "Usuário nao cadastrado" });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Senha incorreta" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, { id: user.id, name: user.name });
  });

  passport.deserializeUser((data, done) => {
    User.findById(data.id)
      .then(user => {
        done(null, user);
      })
      .catch(err => done(err));
  });
};
