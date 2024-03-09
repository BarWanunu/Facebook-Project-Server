const tokenServise = require('../services/token.js');

const createToken = async (req, res) => {
    const { username} = req.body;
    const result = await tokenServise.createToken(username);
    res.json(result);
}
module.exports = { createToken };
