const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require('./models/person.js')

//Authentication
passport.use(
    new LocalStrategy(async (USERNAME, PASSWORD, done) => {
      //Auth logic
      try {
         console.log("Recived Credentials", USERNAME);
        const user = await Person.findOne({ username: USERNAME});
        if (!user) return done(null, false, { message: "Incorrect Username." });
  
        const isPasswordMatch = await user.comparePassword(PASSWORD)
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      } catch (error) {
        return done(error);
      }
    })
  );

  module.exports = passport //Export the passport