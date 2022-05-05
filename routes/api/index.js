const router = require('express').Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// Prefix the routes with /api
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;