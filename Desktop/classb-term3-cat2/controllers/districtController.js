const express = require('express');
const router = express.Router();
const _= require('lodash')
const mongoose = require('mongoose');
const Province = mongoose.model('Province');
const {District, validation} =  require('../models/district_model');
const jwt_verify = require('../middlewares/jwt_verify')
const admin = require('../middlewares/admin')


//Add a new district to the province
router.post('/',  async (req, res)=> {
    const {error} = validation(req.body)
    if(error) return res.send(error.details[0].message).status(400)

    let district = new District();
    ditrict.name = req.body.name;
    district.provinceId =  req.body.provinceId;
    district.districtId = req.body.districtId;
    
    try{
            let check = await checkProvinceExistence(req.body.provinceId);
            if(check){
                  await district.save();
                  return res.send(district).status(201) 
            }
            else{           
                    return res.send("Province Doesn't Exist").status(400)
            }  
  }
   catch(err){
      return res.send(err).status(400)
  }
    
});

//Get all district
router.get('/', (req, res)=>{
    District.find()
                .then(districts => res.send(districts).status(201)) 
                .catch(err => res.send(err).status(404));
});

//Get a district by its id
router.get('/:id', (req, res) => {
    District.findById(req.params.id)
                                    .then(district => res.send(district).status(201))
                                    .catch(err => res.send(err).status(404));
})

//Delete a district
router.delete('/:id', [jwt_verify, admin], (req, res) => {
    District.findByIdAndRemove(req.params.id).then(districts => res.send(districts).status(201)).catch(err => res.send(err).status(404))
});



//Update a district
router.put('/',  async (req, res) => {

    try{
      let check = await checkProvinceExistence(req.body.provinceId);
      if(check){
        let updatedDistrict = await District.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true})
        return res.send(updatedDistrict).status(201) 
      }
      else{           
              return res.send("Province Doesn't Exist").status(400)
      }  
}
      catch(err){
            return res.send(err).status(400)
      }
});

//Get districts By provinces
router.get('/districtsByProvince/:provinceId', async (req, res) => {
    let districts = await district.find({provinceId : req.params.provinceId})
    return res.send(disrticts).status(201)
});

  async function checkProvinceExistence(id){
    let count  = await Province.findOne({_id:id})
        if(count)
            return true;
        else
          return false;
    }

module.exports = router;




