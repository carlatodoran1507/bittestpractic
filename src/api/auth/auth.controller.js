const User = require('../users/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./auth.util')

module.exports.register = async (req, res) => {
    ///Validation of user details
    const { error } = registerValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    //Check if the user is already in the database
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists)
        return res.status(400).send('There is already an account with this email!')

    //Password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        producer: req.body.producer,
    })
    try {
        const savedUser = await user.save()
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.login = async (req, res) => {
    ///Validation of user details
    const { error } = loginValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    //Check if the user is in the database
    const emailRegistered = await User.findOne({ email: req.body.email })
    if (!emailRegistered)
        return res.status(400).send('Invalid email or password!')

    //Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, emailRegistered.password)
    if (!validPassword)
        return res.status(400).send('Invalid email or password!')

    //Token for authorization
    const token = jwt.sign({ _id: emailRegistered._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

    res.send('Logged in!')
}