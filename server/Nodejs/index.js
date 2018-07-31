
const express = require('express');
const bodyParser= require('body-parser');
const {mongoose} = require('./db');
const cors = require('cors');

var userController = require('./controllers/userController');
var placeController = require('./controllers/placeController');
//var imageClassefier = require('./tensorflow/manager');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.get('/', (req, res) => {
    console.log("client conected");
    res.send('Hello client!')
});
app.listen(3000,()=>console.log('Server started at port : 3000'));

app.use('/users',userController);
app.use('/places',placeController);
app.use('/images', express.static(__dirname + '/Images'));