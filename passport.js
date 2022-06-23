const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("./configuration");
const User = require("./models/user");

//Json Web Tokem Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        //find the user specified in toke m
        const user = await User.findById(payload.sub);

        //if user dienst exist handke it
        if (!user) return done(null, false);

        //otherwise return it
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        //find the user specified with email
        const user = await User.findOne({email});
        //if user dienst exist handle it
        if (!user) return done(null, false);
        //if present check if password is correct
        const isMatch = await user.isValidPassword(password);
        //if not handle it
        if (!isMatch) return done(null, false);
        //othewise return it
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
