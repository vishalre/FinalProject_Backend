import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AddressModel from "../Models/AddressModel.js";
//for user creation
const UserRegistration = (req, res, next) => {
  // 10 here is salt nuber its number of cycles of encryption(salt makes hash unpredictable)
  bcrypt.hash(req.body.password, 10, async (err, encryptedPassword) => {
    if (err) {
      res.json({ success: false, message: { user: {}, err } });
      return;
    }
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      password: encryptedPassword,
      address: [],
      cart: [],
      paymentInfo: [],
      reviews: [],
      phone: req.body.phone,
      type: req.body.type,
    });
    await AddressModel.findOne(
      {
        addressLine: req.body.address.addressLine,
        addressLine2: req.body.address.addressLine2,
        city: req.body.address.city,
        state: req.body.address.state,
        zipcode: req.body.address.zipcode,
      },
      async (err, addr) => {
        let address;
        if (addr === null) {
          address = await AddressModel.create({
            addressLine: req.body.address.addressLine,
            addressLine2: req.body.address.addressLine2,
            city: req.body.address.city,
            state: req.body.address.state,
            zipcode: req.body.address.zipcode,
          });
        } else {
          address = addr;
        }
        user.address.push(address._id);
        await AddressModel.updateOne(
          {
            addressLine: req.body.address.addressLine,
            addressLine2: req.body.address.addressLine2,
            city: req.body.address.city,
            state: req.body.address.state,
            zipcode: req.body.address.zipcode,
          },
          { $push: { users: user._id } }
        );
        await user
          .save()
          .then((user) => {
            res.json({ success: true, message: { user, error: {} } });
          })
          .catch((error) => {
            res.json({ success: false, message: { user: {}, error } });
          });
      }
    );
  });
};
//Updates an existing user
const UserDataUpdate = function (req, res, next) {
  if (!req.body._id) {
    res.json({ success: false, message: "No ID provided in the Body" });
    return;
  } else {
    User.findOne({ _id: req.body._id }, (err, user) => {
      if (err) {
        res.json({ success: false, message: "_id not found!" });
        return;
      } else {
        // 10 here is salt number its number of cycles of encryption
        bcrypt.hash(req.body.password, 10, (err, encryptedPassword) => {
          if (err) {
            res.json({
              success: false,
              message: err,
            });
            return;
          }
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.dateOfBirth = req.body.dateOfBirth;
          user.password = encryptedPassword;
          user.phone = req.body.phone;
          user
            .save()
            .then((user) => {
              res.json({ success: true, message: user });
              return;
            })
            .catch((error) => {
              res.json({ success: false, message: error });
              return;
            });
        });
      }
    });
  }
};
//login method compares usernames and password with the encrypted password saved on databases
const login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({ success: false, message: err });
          return;
        }
        if (result) {
          let token = jwt.sign({ name: User.firstName }, "3HD71q2k", {
            expiresIn: "2h",
          });
          req.user = user;
          res.json({
            success: true,
            message: "Login Successful!",
            userData: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              dateOfBirth: user.dateOfBirth,
              type: user.type,
              _id: user._id,
            },
            token: token,
          });
        } else
          res.json({
            success: false,
            message: "Password Doesnt Match!",
            userData: {},
            token: "",
          });
      });
    } else
      res.json({
        success: false,
        message: "User Not Found!",
        userData: {},
        token: "",
      });
  });
};
export default { UserRegistration, UserDataUpdate, login };
