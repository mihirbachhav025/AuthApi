const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../configuration");

const User = require("../models/user");
signToken = (user) => {
  return JWT.sign(
    {
      iss: "ApiAuthMihir",
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    console.log("contents of re.value .body", req.value.body);
    console.log("UserController signup called");
    const { email, password } = req.value.body;

    //check if user with same email
    const foundUser = await User.findOne({ email: email });
    if (foundUser)
      return res.status(403).json({ error: "user already exists" });
    const newUser = new User({
      email: email,
      password: password,
    });
    await newUser.save();
    // return res.status(201).json({ user: "user created" });
    //Es6 const newuser = new User({email,pasword});
    const token = signToken(newUser);

    return res.status(200).json({ token }); //es6 format
  },
  singIn: async (req, res, next) => {
    console.log("UserController signin called");
    const token = signToken(req.user);
    res.status(200).json({ login: "success",token });
  },
  secret: async (req, res, next) => {
    console.log("UserController secret called");
    console.log("I managed to get here");
    res.status(200).json({ secret: "Secret resource" });
  },
};
