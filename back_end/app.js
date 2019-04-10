const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./api/models');

//generate model

app.listen(config.PORT, function() {
    console.log('Server running on port ',config.PORT);
    mongoose.connect(config.DB_URI,{useNewUrlParser: true});   
});

mongoose.connection.once('open',() => {
    console.log('Database connected'); 
    let routes = require('./api/routes');
    app.use('/api', routes);
});
