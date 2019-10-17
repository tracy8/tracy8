require('./models/db')
const Joi = require('joi')
const express = require('express');
const bodyparser = require('body-parser')
let app = express();

const countryController = require('./controllers/countryController.js')
const provinceController = require('./controllers/provinceController.js')
const districtController = require('./controllers/districtController')
const sectorController = require('./controllers/sectorController')
const userController = require('./controllers/userController');
const config = require('config');
const authentication = require('./controllers/authentication')


app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.json());
 
if(!config.get("privateKey")){
    console.log("Private key not defined");
    process.exit(1);
}


app.use('/api/countries', countryController);
app.use('/api/provinces',  provinceController);
app.use('/api/districts',  districtController);
app.use('/api/sectors', sectorController);
app.use('/api/users', userController);
app.use('/api/auth', authentication);

const port = 8000
app.listen(port,  () => console.log(`Server running on port ${port}`)); 
