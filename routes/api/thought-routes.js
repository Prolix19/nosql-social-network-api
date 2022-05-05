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

// Set up POST and DELETE routes at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)
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