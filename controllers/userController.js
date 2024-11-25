import { User, Thought } from '../models/index.js';

// Get all users
export async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get a single user by ID
export async function getSingleUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'No user with this ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Create a new user
export async function createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Update a user by ID
export async function updateUser(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with this ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Delete a user and their associated thoughts
export async function deleteUser(req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No user with this ID' });
        }

        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// Add a friend to a user's friend list
export async function addFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with this ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Remove a friend from a user's friend list
export async function removeFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with this ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Export all functions
export default {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};