const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  id: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function(next) {
  // funcion para encriptar el password, esto funciona cada vez que se ejecute el 'save' en los controladores
  bcrypt
    .genSalt(10)
    .then(salts => {
      bcrypt
        .hash(this.password, salts)
        .then(hash => {
          this.password = hash;
          next();
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
