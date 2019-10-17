const _ = require('lodash');
const express = require('express');
let router = express.Router();
const {User} = require('../models/user_model')
const jwt = require('jsonwebtoken');
const config = require('config')
const Joi = require('joi')
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    
    //Validate user input
    const {error} = validateContent(req.body)
    if(error) return res.send(error.details[0].message).status(400)

    //Check email existence
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.send('Invalid email or password').status(400)

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.send('invalid email or password').status(400)
    return res.send(user.generateAuthenticationToken());
})

function validateContent(user){
    const schema = {
        email: Joi.string().max(255).min(3).required().email(),
        password:Joi.string().max(255).min(3).required()
    }
    return Joi.validate(user, schema)
}
module.exports = router;