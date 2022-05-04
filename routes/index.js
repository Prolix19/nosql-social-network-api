const router = require('express').Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// Prefix the routes with /api
router.use("/api", userRoutes);
router.use("/api", thoughtRoutes);

module.exports = router;