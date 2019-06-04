const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
let cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors());

app.listen(config.PORT, function() {
    console.log('Server running on port ',config.PORT);
    mongoose.connect(config.DB_URI, {useNewUrlParser: true});   
});

mongoose.connection.once('open',() => {
    console.log('Database connected'); 
    require('./api/helpers/uploadImage');
    require('./api/models');
    let routes = require('./api/routes');
    app.use(function(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Expose-Headers', 'Authorization');
        next();
    })
    app.use('/api', routes);
});
