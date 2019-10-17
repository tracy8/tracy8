const express = require('express');
const router = express.Router();
const _= require('lodash')
const mongoose = require('mongoose');
const District = mongoose.model('District');
const {Sector, validation} =  require('../models/sector_model');
const jwt_verify = require('../middlewares/jwt_verify')
const admin = require('../middlewares/admin')


//Add a new sector to the district
router.post('/',  async (req, res)=> {
    const {error} = validation(req.body)
    if(error) return res.send(error.details[0].message).status(400)

    let sector = new Sector();
    sector.name = req.body.name;
    sector.sectorId =  req.body.sectorId;
    district.districtId = req.body.districtId;
    
    try{
            let check = await checkDistrictExistence(req.body.DistrictId);
            if(check){
                  await sector.save();
                  return res.send(sector).status(201) 
            }
            else{           
                    return res.send("district Doesn't Exist").status(400)
            }  
  }
   catch(err){
      return res.send(err).status(400)
  }
    
});

//Get all sectors
router.get('/', (req, res)=>{
    Sector.find()
                .then(sectors => res.send(sectors).status(201)) 
                .catch(err => res.send(err).status(404));
});

//Get a sector by its id
router.get('/:id', (req, res) => {
    Sector.findById(req.params.id)
                                    .then(sector => res.send(sector).status(201))
                                    .catch(err => res.send(err).status(404));
})

//Delete a sector
router.delete('/:id', [jwt_verify, admin], (req, res) => {
    Sector.findByIdAndRemove(req.params.id).then(districts => res.send(sectors).status(201)).catch(err => res.send(err).status(404))
});



//Update a sector
router.put('/',  async (req, res) => {

    try{
      let check = await checkDistrictExistence(req.body.districtId);
      if(check){
        let updatedSector= await Sector.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true})
        return res.send(updatedSector).status(201) 
      }
      else{           
              return res.send("District Doesn't Exist").status(400)
      }  
}
      catch(err){
            return res.send(err).status(400)
      }
});

//Get sector By district
router.get('/sectorsByDistrict/:districtId', async (req, res) => {
    let sectors = await sector.find({districtId : req.params.districtId})
    return res.send(sectors).status(201)
});

  async function checkDistrictExistence(id){
    let count  = await district.findOne({_id:id})
        if(count)
            return true;
        else
          return false;
    }

module.exports = router;




