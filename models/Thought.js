const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reactions are a schema only, we do not model it. They're enabled via the Thoughts schema.
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        length: [1, 280]
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtValue) => dateFormat(createdAtValue)
    }}, {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        length: [1, 280]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtValue) => dateFormat(createdAtValue)
    },
    username: {
        type: String,
        required: true
    },
    // Reactions are included as a reaction field subdocument schema within the Thought model, as instructed.
    reactions: [ReactionSchema]},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;