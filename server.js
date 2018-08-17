var express = require('express');
var socket = require('socket.io')

//App setup
var app = express();
var server = app.listen(4000,function(){
	console.log('listening to requests on port 4000');
});

app.use(express.static('public'));

var io = socket(server);

var allPlayers = [];
var addPlayers = true;


io.on('connection',function(socket){
	console.log('made socket connection', socket.id);
	if(addPlayers){
		allPlayers.push(socket.id);
	}

	socket.on('start', function(data){
		if(data.status && addPlayers){
			console.log("The Game has Started!");
			addPlayers = false;
			console.log(allPlayers);
		}
	});
});