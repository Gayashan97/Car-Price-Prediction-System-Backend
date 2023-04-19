const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

//login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.login(email, password)
        const token = createToken(user._id);
        const fname =  user.fname;
        res.status(200).json({ email, fname, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

//signup user
const signupUser = async (req, res) => {

    const { fname, lname, email, password, confirmPassword } = req.body;

    try {
        const user = await User.signup(fname, lname, email, password, confirmPassword)
        const token = createToken(user._id);
        res.status(200).json({ email, fname, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = { loginUser, signupUser };