const mongoose = require('mongoose');
const Joi = require('joi')
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is reqquired for the user"
    },
    email: {
        type: String,
        required: "Email is required for the user"
    },
    password: {
        type: String,
        required: "Password is necessary"
    },
    isAdmin: {
        type: Boolean,
       
      
    }
})
userSchema.methods.generateAuthenticationToken = function(){
    const token = jwt.sign({_id: this._id, name: this.name, email: this.email, isAdmin: this.isAdmin}, config.get('privateKey'))
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        name:Joi.string().max(255).min(3).required(),
        email: Joi.string().max(255).min(3).required().email(),
        password:Joi.string().max(255).min(3).required(),
        isAdmin: Joi.boolean()
    }
    return Joi.validate(user, schema)
}
module.exports.User = User;
module.exports.validate = validateUser;

