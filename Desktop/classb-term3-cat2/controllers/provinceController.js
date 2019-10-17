const express = require('express');
const router = express.Router();
const _= require('lodash')
const mongoose = require('mongoose');
const Country = mongoose.model('Country');
const {Province, validation} =  require('../models/province_model');
const jwt_verify = require('../middlewares/jwt_verify')
const admin = require('../middlewares/admin')


//Add a new province to the country
router.post('/',  async (req, res)=> {
    const {error} = validation(req.body)
    if(error) return res.send(error.details[0].message).status(400)

    let province = new Province();
    province.name = req.body.name;
    province.countryId =  req.body.countryId;
    province.provinceId = req.body.provinceId;
    
    try{
            let check = await checkCountryExistence(req.body.countryId);
            if(check){
                  await province.save();
                  return res.send(province).status(201) 
            }
            else{           
                    return res.send("Country Doesn't Exist").status(400)
            }  
  }
   catch(err){
      return res.send(err).status(400)
  }
    
});

//Get all provinces
router.get('/', (req, res)=>{
    Province.find()
                .then(provinces => res.send(provinces).status(201)) 
                .catch(err => res.send(err).status(404));
});

//Get a province by its id
router.get('/:id', (req, res) => {
    Province.findById(req.params.id)
                                    .then(province => res.send(province).status(201))
                                    .catch(err => res.send(err).status(404));
})

//Delete a province
router.delete('/:id', [jwt_verify, admin], (req, res) => {
    Province.findByIdAndRemove(req.params.id).then(provinces => res.send(provinces).status(201)).catch(err => res.send(err).status(404))
});



//Update a province
router.put('/',  async (req, res) => {

    try{
      let check = await checkCountryExistence(req.body.countryId);
      if(check){
        let updatedProvince = await Province.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true})
        return res.send(updatedProvince).status(201) 
      }
      else{           
              return res.send("Country Doesn't Exist").status(400)
      }  
}
      catch(err){
            return res.send(err).status(400)
      }
});

//Get provinces By country
router.get('/provincesByCountry/:countryId', async (req, res) => {
    let provinces = await Province.find({countryId : req.params.countryId})
    return res.send(provinces).status(201)
});

  async function checkCountryExistence(id){
    let count  = await Country.findOne({_id:id})
        if(count)
            return true;
        else
          return false;
    }

module.exports = router;




