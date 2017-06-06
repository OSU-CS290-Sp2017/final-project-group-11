

//get yo' node.js packages, yeah
var express = require('express');
var express_handlebars = require('express-handlebars');
var path = require('path');
var fs = require('fs');

var app = express(); //use app for all your express stuff

//var json_data = require("./"); //json file goes here, use json_data to obtain data for wiki pages

//allows for diff port number functionality
var port_num = 3000;
if(process.argv[2] == 'PORT' && process.argv.length > 3){
	port_num = process.argv[3];
}

//file syncing, obtains the handlebar page templates
//var ind


//renders the main.handlebars stuff, default layout
app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
