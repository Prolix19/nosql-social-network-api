const router = require('express').Router();
// Import all of the API routes from /api/index.js
const apiRoutes = require('./api');

// Prefix all API routes with /api
router.use('/api', apiRoutes);

// Default route if no other route matches
router.use((req, res) => {
    res.status(404).send('404 Not Found');
});

module.exports = router;