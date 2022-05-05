const router = require('express').Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// Routes are prefixed with /api thanks to ../index.js
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;