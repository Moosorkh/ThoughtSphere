//import mongoose from 'mongoose';
import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';

const seedData = async () => {
    try {
        await connection;
        console.log('Database connected!');

        console.log('Deleting existing data...');
        await User.deleteMany({});
        await Thought.deleteMany({});
        console.log('Existing data deleted.');

        const users = [
            { username: 'lernantino', email: 'lernantino@gmail.com' },
            { username: 'amiko', email: 'amiko@gmail.com' },
        ];

        const thoughts = [
            { thoughtText: "Here's a cool thought...", username: 'lernantino' },
            { thoughtText: 'Thoughts are the words of our minds 🤔', username: 'amiko' },
        ];

        console.log('Inserting new data...');
        await User.insertMany(users);
        console.log('Users added.');
        await Thought.insertMany(thoughts);
        console.log('Thoughts added.');

        console.log('Seed data added!');
        process.exit(0);
    } catch (err) {
        console.error('Error during seeding:', err);
        process.exit(1);
    }
};

seedData();