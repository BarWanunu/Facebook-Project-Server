const Post = require('../models/posts');

const createPost = async (id, text, profilr, img, profileImg) => {
    const post = new Post({
        id,
        text,
        profile,
        img,
        profileImg
    });
    try {
        await post.save();
        return 'Post created successfully';
    } catch (error) {
        return 'Error creating post';
    }
}