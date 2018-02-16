const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/visit', require('./routes/visit'));

app.use('/', function(req, res){
    res.status(404).json({
        title: '404 Error'
    });
})

var port = process.env.PORT || 3000;

const server= http.createServer(app);
server.listen(port, ()=>{
    console.log('App running at port:', port)
});