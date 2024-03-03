const User = require('../models/users');

async function createUser(emailuser, usernameuser, passworduser, photouser) {
    try {
        console.log('Checking for existing user with username:', usernameuser);

        const userCount = await User.countDocuments({ userName: usernameuser });

        console.log('Number of existing users with the same username:', userCount);

        if (userCount > 0) {
            return { success: false, message: 'Username is already taken' };
        }

        const newUser = new User({ email: emailuser, userName: usernameuser, password: passworduser, photo: photouser });

        await newUser.save();

        console.log('User created successfully:', newUser);

        return { success: true, message: 'User created successfully' };
    } catch (error) {
        console.error('Error during user creation:', error.message);
        return { success: false, message: 'An error occurred while creating the user' };
    }
}

module.exports = { createUser };

