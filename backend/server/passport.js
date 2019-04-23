const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./models/User");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "secret"
    },
    async function(jwtPayload, done) {
      console.log("hello");
      try {
        const user = await User.findOne({
          where: {
            id: jwtPayload.id
          }
        });
        if (!user) {
          return done(new Error(), false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(new Error(), false);
      }
    }
  )
);

module.exports = null;
