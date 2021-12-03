const db = require("../models");
const bcrypt = require("bcrypt");

// POST ROUTE sign up
const signup = (req, res) => {
  // hash and salt the password
  // res.send('I hit this route')
  console.log(req.body);

  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  req.body.confirmedPassword = req.body.password;
  db.User.create(req.body, (error, createdUser) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      console.log("user registered");
      res.status(201).json(createdUser);
    }
  });
};

// USER LOGIN ROUTE (CREATE SESSION)
const login = (req, res) => {
  console.log(req.body)
  db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser;
          console.log("User has been logged in");
          res.status(200).json(foundUser);
        } else {
          res.status(404).json({ error: "Incorrect password" });
        }
      } else {
        res.status(400).json({ error: err });
      }
    }
  });
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ msg: "Users logged out" });
  });
};

module.exports = {
  signup,
  login,
  logout,
};
