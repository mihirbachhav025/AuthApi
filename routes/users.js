const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
require("../passport");
const UsersController = require("../controllers/users");
const { validateBody, schemas } = require("../helpers/routeHelpers");

router
  .route("/signup")
  //email and password
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router
  .route("/signin")
  //genrate token
  .post(
    [validateBody(schemas.authSchema),
    passport.authenticate("local", { session: false })],
    UsersController.singIn
  );

router
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    UsersController.secret
  );

module.exports = router;
