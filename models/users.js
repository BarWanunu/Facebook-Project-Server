import { MongoClient } from 'mongodb';

const Mongodb = MongoClient;

async function createUser(emailuser, usernameuser, passworduser,photouser) {
  const client = new Mongodb('mongodb://localhost:27017');

  try {
    await client.connect();
    const db = client.db('facebook');
    const users = db.collection('users');
    const existingUser = await users.findOne({ userName: usernameuser });
    if (existingUser) {
      return { success: false, message: 'Username is already taken' };
    }

    const result = await users.insertOne({
      email: emailuser,
      userName: usernameuser,
      password: passworduser,
      photo: photouser,
    });

    return { success: true, message: 'User created successfully' };

  } finally {
    await client.close();
  }
}

export { createUser };
