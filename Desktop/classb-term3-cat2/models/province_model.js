const mongoose = require('mongoose');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


const provinceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name of the province is required'
    },

    provinceId: {
        type: Number,
        required: "province of the country is required"
    },
    countryId: {
        type: Number,
        required: "country id  is required"
    }
});

const Province = mongoose.model('Province', provinceSchema);

function validateProvince(province){
    const validationSchema = {
        name: Joi.string().max(255).min(3).required(),
        countryId: Joi.objectId().max(255).min(3).required(),
        provinceId: Joi.number().required()
    }
    return Joi.validate(province, validationSchema)
}
module.exports.Product = Province
module.exports.validation = validateProvince