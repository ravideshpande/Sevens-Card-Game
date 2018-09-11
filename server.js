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

var deck = [];
for(var i = 0; i < 4; i++) {
	for(var j = 1; j <= 13; j++) {
		var card = {
			suit:i,
			value:j
		}
		deck.push(card)
	}
}

for(var i = 0; i<5; i++){
	deck = shuffle(deck)
}


io.on('connection',function(socket){
	console.log('made socket connection', socket.id);
	if(addPlayers){
		var tempPlayer = {
			playerID:allPlayers.length,
			connectionID:socket.id,
			playerName:"",
			hand : []
		}
		allPlayers.push(tempPlayer);
	}

	socket.on('name', function(data){
		for(var i = 0; i<allPlayers.length;i++){
			if(allPlayers[i].connectionID == socket.id){
				allPlayers[i].playerName = data.name;
			}
		}
		var playerNames = [];
		for(var i =0; i<allPlayers.length;i++){
			if(allPlayers[i].playerName!=""){
				playerNames.push(allPlayers[i].playerName);
			}
		}
		io.sockets.emit('listPlayers', {names:playerNames});
	});

	socket.on('start', function(data){
		if(data.status && addPlayers){
			console.log("The Game has Started!");
			addPlayers = false;
			console.log(allPlayers);

			var NUM_PLAYERS = allPlayers.length;

			for(var i = 0; i < 52; i++){
		 		var playerIndex = (i % NUM_PLAYERS);
		 		allPlayers[playerIndex].hand.push(deck[i]);
		 	}

		 	for(var i = 0; i<NUM_PLAYERS;i++){
		 		io.to(allPlayers[i].connectionID).emit('startHand',allPlayers[i].hand);
		 	}
		}
	});
});

function shuffle(input){
	var shuffled = [];
	for(var i = input.length;i>0; i--){
		var randomIndex = Math.floor(Math.random()*i);
		shuffled.push(input[randomIndex]);
		input.splice(randomIndex,1);
	}
	return shuffled;
} 