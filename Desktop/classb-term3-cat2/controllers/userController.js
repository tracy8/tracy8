const _ = require('lodash');
const express = require('express');
let router = express.Router();
const {User, validate} = require('../models/user_model')
const hashPassword = require('../utils/hash')
const admin = require('../middlewares/admin')
const jwt_verify = require('../middlewares/jwt_verify')


//Get all users 
router.get('/' , async (req, res) => {
    const users = await User.find();
    return res.send(users).status(201)
});

//get user by id
router.get('/:id' , async (req, res) => {
    const users = await User.find({_id: req.params.id});
    return res.send(users).status(201)
});

//add a user
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.send(error.details[0].message).status(400)

    let user = await User.findOne({email: req.body.email})
    if(user) return res.send('You already have an account').status(400)

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    const hashedPassword = await hashPassword(user.password)
    user.password = hashedPassword;
    await user.save();
    return res.send(_.pick(user, ["_id", 'name', 'email', 'isAdmin'])).status(201)
});

router.put('/', [jwt_verify, admin], async (req, res) => {
    let user = await   User.findByIdAndUpdate({ _id : req.body._id}, req.body, {new : true})
    return res.send(user).status(201)
})

router.delete('/:id', [jwt_verify, admin], async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    return res.send("User Deleted!!!").status(201)
})
module.exports = router;
