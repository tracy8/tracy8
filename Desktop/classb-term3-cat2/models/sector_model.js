const mongoose = require('mongoose');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


const sectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name of the sector is required'
    },

    sectorId: {
        type: Number,
        required: "sector id is required"
    },
    districtId: {
        type: Number,
        required: "distruct id  is required"
    }
});

const Sector= mongoose.model('Sector', sectorSchema);

function validateSector(sector){
    const validationSchema = {
        name: Joi.string().max(255).min(3).required(),
        districtId: Joi.objectId().max(255).min(3).required(),
        sectorId: Joi.number().required()
    }
    return Joi.validate(sector, validationSchema)
}
module.exports.Product = Sector
module.exports.validation = validateSector