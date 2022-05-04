const res = require('express/lib/response');
const {Thought, User} = require('../models');

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: "-__v"
        })
        .select("-__v")
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Get one thought by its id and populated user data
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'user',
            select: "-__v"
        })
        .select("-__v")
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "Thought not found"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Create a new thought
    addThought({params, body}, res) {
        console.log(body);
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.thoughtId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "User not found"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // Update a thought by its id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "Thought not found"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // Delete a thought by its id
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "Thought not found"});
                return;
            }
            res.json(dbThoughtData);
        }
        ).catch(err => res.status(400).json(err));
    },

    // Add a reaction to the reactions array field of a single thought (by the thought's id)
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, {$push: {reactions: body.reactionId}}, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "Thought not found"});
                return;
            }
            res.json(dbThoughtData);
        }
        ).catch(err => res.status(400).json(err));
    },

    // Remove a reaction from a thought by the reaction's reactionId value
    removeReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.id}, {$pull: {reactions: params.reactionId}}, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "Thought not found"});
                return;
            }
            res.json(dbThoughtData);
        }
        ).catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;