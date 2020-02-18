module.exports = {
  PORT: process.env.PORT || 3005,
  DB:
    process.env.DB ||
    "mongodb+srv://naymc0:Dr3amw3av3r@@cluster0-vydpp.mongodb.net/test?retryWrites=true&w=majority",
  SECRET_KEY_TOKEN:
    process.env.SECRET_KEY_TOKEN ||
    "esteesmitokensecretoymuyesperoquemuyescondido"
};
