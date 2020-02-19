module.exports = {
  PORT: process.env.PORT || 3005,
  DB: process.env.DB || "mongodb://localhost:27017/articles",
  SECRET_KEY_TOKEN:
    process.env.SECRET_KEY_TOKEN ||
    "esteesmitokensecretoymuyesperoquemuyescondido"
};
