const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/province', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log('Connected to DB succesfully'))
.catch(err => console.log('failed to connect to DB',err))

require('./province_model')
require('./district_model')
require('./sector_model')
