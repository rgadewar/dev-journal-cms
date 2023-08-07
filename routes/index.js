// routes/index.js
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashBoardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;


// Route handling for "/dashboard" virtual path
// router.use("/dashboard", (req, res, next) => {
//     // Assuming you have other data to pass as well
//     const dataContext = {
//       loggedIn: req.session.loggedIn === true, // Convert to a boolean
//       // Other data properties you want to pass to the template
//     };
  
//     // Attach the loggedIn data context and pass the request to the dashboardRoutes
//     req.dataContext = dataContext;
//     next();
//   });
  
//   // Mount the dashboardRoutes under "/dashboard" path
//   router.use('/dashboard', dashboardRoutes);

// routes
// │   index.js
// │
// └───api
// │   │   commentRoutes.js
// │   │   postRoutes.js
// │   │   userRoutes.js
// │   │   index.js
// │   
// └───homeRoutes.js
// │
// └───dashboardRoutes.js
