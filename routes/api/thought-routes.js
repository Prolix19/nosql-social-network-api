const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controllers');

//Routes are prefixed with /thoughts thanks to ./index.js

// Set up a POST route at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// Set up a DELETE route at /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

// Set up GET, PUT, DELETE routes at /api/thoughts/:id
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// Set up GET all and POST routes at /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(addThought);

module.exports = router;