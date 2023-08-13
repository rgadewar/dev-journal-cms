// server.js
const express = require("express");
const exphbs = require('express-handlebars');
const session = require("express-session");
const passport = require("./config/passport");
const path = require("path");
const moment = require("moment");

// const db = require('./models/index');
// const sequelize = db.sequelize;
const sequelize = require('./config/connection');
require('dotenv').config();
const seedDatabase = require('./seeds/seedDatabase'); // Import the seed function
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the template engine
app.set("views", path.join(__dirname, "views"));
// Set up Handlebars as the template engine with the runtime option
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      formatDate: function (date) {
        return moment(date).format("M/D/YYYY");
      },
  
    },
    runtimeOptions: {
      allowProtoPropertiesByDefault: true, // Enable the option
    },
  })
  
);

app.set("view engine", "handlebars");

// Creating express app and configuring middleware needed for authentication
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Use the indexRouter for handling routes
const routes = require('./routes');
app.use(routes);



// Force true to drop/recreate table(s) on every sync
sequelize.sync({ force: false }).then(async () => {
  // Uncomment this line to run the seed files
  // await seedDatabase();

  // Start the server after syncing and seeding (if needed)
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
