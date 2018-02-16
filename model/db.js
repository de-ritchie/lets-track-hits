var chalk = require('chalk');
const mongoose = require('mongoose');

var dbUrl = 'mongodb://de-ritchie:Mlab123@ds237848.mlab.com:37848/ecs';

mongoose.connection.once('open', function(){
    console.log(chalk.green('Connection with MongoDB is open '+dbUrl));
});

mongoose.connection.on('error', function(){
    console.log(chalk.red('Error in connection with MongoDB '+dbUrl));
});

mongoose.connection.on('disconnected', function(){
    console.log(chalk.orange('MongoDB disconnected '+dbUrl));
});

mongoose.connect(dbUrl);

console.log(chalk.green('*********Inside MongoDB********'));

console.log(chalk.green('Initiating analytics Model'));

exports.Analytics = require('./schema/analytics.js');

console.log(chalk.green('*********MongoDB Ready********'));