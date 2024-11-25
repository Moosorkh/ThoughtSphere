import { Thought, User } from '../models/index.js';

export function getThoughts(req, res) {
    Thought.find()
        .then(thoughts => res.json(thoughts))
        .catch(err => res.status(500).json(err));
}
export function getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
        .then(thought => !thought
            ? res.status(404).json({ message: 'No thought with this ID' })
            : res.json(thought)
        )
        .catch(err => res.status(500).json(err));
}
export function createThought(req, res) {
    Thought.create(req.body)
        .then(thought => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
        })
        .then(user => !user
            ? res.status(404).json({ message: 'Thought created, but no user with this ID' })
            : res.json({ message: 'Thought successfully created!' })
        )
        .catch(err => res.status(500).json(err));
}
export function updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then(thought => !thought
            ? res.status(404).json({ message: 'No thought with this ID' })
            : res.json(thought)
        )
        .catch(err => res.status(500).json(err));
}
export function deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then(thought => !thought
            ? res.status(404).json({ message: 'No thought with this ID' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )
        )
        .then(user => !user
            ? res.status(404).json({ message: 'Thought deleted, but no user with this ID' })
            : res.json({ message: 'Thought successfully deleted!' })
        )
        .catch(err => res.status(500).json(err));
}
// Add a reaction to a thought
export function addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
    )
        .then(thought => !thought
            ? res.status(404).json({ message: 'No thought with this ID' })
            : res.json(thought)
        )
        .catch(err => res.status(500).json(err));
}
// Remove a reaction from a thought
export function removeReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
    )
        .then(thought => !thought
            ? res.status(404).json({ message: 'No thought with this ID' })
            : res.json(thought)
        )
        .catch(err => res.status(500).json(err));
}

// Add a default export with all functions
export default {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
};