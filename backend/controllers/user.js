const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");



const userController = {};

userController.register = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ mobileNo: req.body.mobileNo }).then((user) => {
    if (user) {
      errors.mobileNo = "mobileNo already exists";
      return res.status(400).json(errors);
    } else {
      
      const newUser = new User({
        name: req.body.name,
        mobileNo: req.body.mobileNo,
        password: req.body.password,
        // email: req.body.email
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

userController.login = async (req, res, next) => {
  const mobileNo = req.body.mobileNo;
  const password = req.body.password;

  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ mobileNo }).then((user) => {
    if (!user) {
      errors.mobileNo = "User not found";
      return res.status(404).json(errors);
    }
    // console.log(user,'uiui');
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };
        jwt.sign(
          payload,
          process.env.secretOrKey,
          { expiresIn: 60 },
          // { expiresIn: 360000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              isAdmin : user.isAdmin
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(404).json(errors);
      }
    });
  });
};

module.exports = userController;
