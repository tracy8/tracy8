const mongoose = require('mongoose');
const Joi = require('joi')


let countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name of the country is required"
    },
    countryId: {
        type: Number,
        required: "the countryId  is required"
    }
 
});
const Country = mongoose.model('Country', countrySchema);

function validateCountry(country){
    const validationSchema = {
        name: Joi.string().max(255).min(3).required(),
        countryId: Joi.number().max(30).min(1).required()
    }
    return Joi.validate(country, validationSchema)
}
module.exports.Country= Country
module.exports.validate = validateCountry