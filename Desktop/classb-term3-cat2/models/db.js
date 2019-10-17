const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/national-administrative-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  .then(() => console.log('Connection Successful....'))
    .catch(err =>console.log('failed to connect to mongodb',err));
 
//Connecting Node and MongoDB
require('./country_model');
require('./province_model');
require('./district_model');
require('./sector_model');
