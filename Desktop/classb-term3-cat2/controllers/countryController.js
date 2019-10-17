const express = require('express');
const bodyParser = require('body-parser');
const Joi =  require('joi');
const router = express.Router();
const mongoose = require('mongoose')


const {Country, validate} = require('../models/country_model.js');
const province = mongoose.model('Province')
const admin = require('../middlewares/admin')
const jwt_verify = require('../middlewares/jwt_verify')
const {User} = require('../models/user_model')

//Add a new country

router.post('/', [jwt_verify, admin], async (req,res) =>{
    const {error} = validate(req.body)
    if(error) return res.send(error.details[0].message).status(400)
    let country = await Country.findOne({name:req.body.name})
    if(country) return res.send('Country already registered!!').status(400)
    country  =  new Country({
        name: req.body.name,
        countryId: req.body.countryId
    });
    await country.save()
    return res.send(country).status(201)
});


//Get all countries
router.get('/', (req, res) => {
    Country.find().then(countries => res.send(countries).status(201))
                    .catch(err => res.send(err).status(404))
})

//Get a country by id
router.get('/:id', (req, res) => {
    Country.findById(req.params.id).then(countries => res.send(countries))
                                    .catch(err => res.send(err).status(404));
});


//Update a country
router.put('/', [jwt_verify, admin], (req, res) => {
    Country.findByIdAndUpdate({ _id : req.body._id}, req.body, {new : true})
                        .then(updatedCountry=> res.send(updatedCountry).status(201))
                        .catch(err => res.send(err).status(404))
})

//Delete a country
router.delete('/:id', [jwt_verify, admin], async (req, res) => {
    let check = await checkProvinceOfCountry(req.params.id);
    if(check){
            try{
                let deletable = await Country.findByIdAndRemove(req.params.id)
                res.send(deletable).status(201)
            }
            catch (err){
                return res.send(err).status(400)
            }     
    }else{
          try{
                return res.send("Country Can't be Deleted It has provinces in  it").status(400)
          }
          catch (err){
                  return res.send(err).status(400)
          }   
    }
    
})

async  function checkProvinceOfCountry(id){
    let count  = await Province.findOne({countryId : id})
    if(count)
        return false;
    else
      return true;
}

//Api for statistics
function getStatistics(){
            Country.find().countDocuments()
                    .then(countryCount =>console.log({ TotalCountries: countryCount}))
                    .catch(err => console.error(err));
            User.find().countDocuments()
                    .then(userCount => console.log({ TotalUsers : userCount}))
            User.find({isAdmin: true}).countDocuments()
                    .then(admins => console.log({ TotalAdmins : admins}))
            User.find({isAdmin: false}).countDocuments()
                    .then(noneAdmins => console.log({ TotalNoneAdmins : noneAdmins}))
}
getStatistics();
  module.exports = router;


