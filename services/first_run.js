const fs = require('fs');
const User = require('../models/users');
const Post = require('../models/posts');

function readJSONFile(filePath) {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error(`Error reading JSON file ${filePath}:`, error);
        return null;
    }
}

//creates the users in the db
async function initializeUsers() {
    await User.deleteMany();
    try {
        // Read JSON file
        const userData = readJSONFile('./data/users.json');
        if (!userData) {
            console.error('No user data found.');
            return;
        }

        // Insert users into database
        await User.insertMany(userData);
        console.log('Users inserted successfully.');
    } catch (error) {
        console.error('Error initializing users:', error);
    }
}

//creates the posts in the db
async function initializePosts() {
    await Post.deleteMany();
    try {
        // Read JSON file
        const postData = readJSONFile('./data/posts.json');
        if (!postData) {
            console.error('No post data found.');
            return;
        }

        // Insert posts into database
        await Post.insertMany(postData);
        console.log('Posts inserted successfully.');
    } catch (error) {
        console.error('Error initializing posts:', error);
    }
}

module.exports = { initializeUsers, initializePosts };