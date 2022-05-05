const router = require('express').Router();
// Import all of the API routes from /api/index.js
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    console.log("Default route");
    res.status(404).send('404 Not Found');
});

module.exports = router;