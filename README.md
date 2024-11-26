# ThoughtSphere

## Description

ThoughtSphere is a backend application built with Node.js, Express.js, MongoDB, and Mongoose. It is designed to manage user thoughts, reactions, and relationships. The project demonstrates CRUD API functionality, allowing seamless integration into larger applications or as a standalone backend solution.

- **Motivation:** To showcase how to create a robust RESTful API using Node.js and MongoDB.
- **Purpose:** Built to solve the challenge of efficiently managing data interactions in a social network context.
- **Problem Solved:** Facilitates handling user-generated content and interactions in a scalable and structured way.
- **What I Learned:** Improved my understanding of MongoDB schemas, subdocuments, virtuals, and RESTful API principles.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Code Examples](#code-examples)
- [Environment Variables](#environment-variables)
- [Credits](#credits)
- [License](#license)

---

## Installation

1. **Clone the Repository**:
```bash
    git clone https://github.com/your-repository/ThoughtSphere.git
```

2. **Install Dependencies**:
```bash
    cd ThoughtSphere
    npm install
```

3. **Start MongoDB**:
    Make sure MongoDB is running locally or use a hosted database like MongoDB Atlas. By default, the app connects to:
```
    mongodb://127.0.0.1:27017/socialNetworkDB
```

4. **Seed the Database**:
    Run the following command to populate the database with sample data:
```bash
    npm run seeds
```

5. **Start the Server**:
    Launch the application:
```bash
    npm start
```
---

## Usage

### Testing the API examples:

Use tools like Thunder Client or Postman to test the following API endpoints.

#### Example: Add a New Thought
- **POST** `/api/thoughts`
- **Request example**: `/api/thoughts/6473abc9ec3a196775bfc629`
- **Body Example**:
```json
  {
      "thoughtText": "Here's a cool thought...",
      "username": "lenanntino"
  }
```
#### Response example:

```json
{
    "_id": "6473abc9ec3a196775bfc629",
    "thoughtText": "Here's a cool thought...",
    "username": "lenanntino",
    "createdAt": "2024-11-25T00:00:00.000Z",
    "reactions": [],
    "reactionCount": 0
}
```

#### Example: Get All Thoughts

- **GET** `/api/thoughts`

#### Response example:

```json
[
    {
        "_id": "6473abc9ec3a196775bfc629",
        "thoughtText": "Here's a cool thought...",
        "username": "lenanntino",
        "createdAt": "2024-11-25T00:00:00.000Z",
        "reactions": [],
        "reactionCount": 0
    },
    {
        "_id": "6473def9ec3a196775bfc62b",
        "thoughtText": "Thoughts are the words of our minds.",
        "username": "amiko",
        "createdAt": "2024-11-25T00:00:00.000Z",
        "reactions": [],
        "reactionCount": 0
    }
]
```
#### Example: Add a Reaction to a Thought

### **POST** `/api/thoughts/:thoughtId/reactions`
- **Request example**: `/api/thoughts/6473def9ec3a196775bfc62b/reactions`
- **Body Example**:
```json
{
    "reactionBody": "This is a great thought!",
    "username": "reactionUser"
}
```
- **Response**:
```json
{
    "_id": "6473def9ec3a196775bfc62b",
    "thoughtText": "Thoughts are the words of our minds.",
    "username": "amiko",
    "createdAt": "2024-11-25T00:00:00.000Z",
    "reactions": [
        {
            "reactionId": "6074abcde123f5e45a678901",
            "reactionBody": "This is a great thought!",
            "username": "reactionUser",
            "createdAt": "2024-11-25T00:00:00.000Z"
        }
    ],
    "reactionCount": 1
}
```

#### Example: Delete a User
- DELETE /api/users/:userId
- **Request example**: `/api/thoughts/6473def9ec3a196775bfc62b`
- **Response**:
```json
{
    "_id": "6473def9ec3a196775bfc62b",
    "thoughtText": "Thoughts are the words of our minds.",
    "username": "amiko",
    "createdAt": "2024-11-25T00:00:00.000Z",
    "reactions": [],
    "reactionCount": 0
}
```

### **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`

## Features
- Users: Create, read, update, and delete users.
- Thoughts: Manage user-generated thoughts.
- Reactions: Add or remove reactions to thoughts.
- MongoDB Integration: All data is stored and retrieved using MongoDB and Mongoose.
- Virtuals: Thought schema uses virtuals for dynamic fields (e.g., reaction count).

## Code Examples
### Thought Model with Reactions
```javascript
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
});
```
### User model
```Javascript
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

// Create a virtual for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

export default User;
```

## Environment Variables
#### Create a .env file in the project root with the following:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/socialNetworkDB
PORT=3001
```
## Credits
- Developer: Mehdi Azar
- GitHub Repository: [ThoughtSphere](https://github.com/Moosorkh/ThoughtSphere.git)
- Walkthrough video: [Walkthrough video](https://drive.google.com/file/d/18fQxaQbr15P95UKrIZfkAQpdswar0kEf/view)
## License
This project is licensed under the MIT License. For more details, see the LICENSE file.

## 🏆 Bonus:

- Added subdocument schema for reactions.
- Integrated virtual properties for thought reaction count.

