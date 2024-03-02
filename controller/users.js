import { createUser as createUserModel } from '../models/users.js';

function createUser(email, userName, password,confirmPassword, photo) {

    // Check if email is in the correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: 'Please enter a valid email address' };
    }
    // Check if password meets the requirements
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!passwordRegex.test(password)) {
        return { success: false, message: 'Password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.' };
    
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return { success: false, message: 'Password and Confirm Password do not match' };
   
    }

    // Check if display name is not empty
    if (userName == '') {
        return { success: false, message: 'Please enter a display name' };
    }
    const message= createUserModel(email, userName, password,photo);
    return message



    // Check if password meets the requirements

}

export { createUser };