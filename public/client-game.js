var socket = io.connect("http://localhost:4000");

var deck = [];

function setName(){
	var playerName = document.getElementById("playerName").value;
	if(playerName!="Enter Name..." && playerName!=""){
		console.log(playerName);
		socket.emit('name',{
			name: playerName
		});
		document.getElementById("setName").style.display = "none";
		document.getElementById("gameRoom").style.display = "block";
	}
}

function startGame(){
	socket.emit('start',{
		status: true
	});
}

socket.on('listPlayers',function(data){
	var output = "";
	for(var i = 0; i<data.names.length;i++){
		output+= "<li>"+data.names[i]+"</li>";
	}
	document.getElementById("gamePlayers").innerHTML = output;
});

socket.on('startHand',function(data){
	document.getElementById("gameRoom").style.display = "none";
	console.log(data);
	deck = data;
	for(var i = 0; i<deck.length;i++){
		var output = "";
 		var first = "<div class='card'><div class='value'>";
 		var middle1 = "</div><div class='suit "

 		var middle2= "'></div><div class='rotatedValue'>";
 		var end = "</div></div>";

 		var value = deck[i].value;
 		var suit = deck[i].suit;
 		var suitString = "";
 		if(suit == 0){
 			suitString = "heart";
 		}
 		else if(suit == 1){
 			suitString = "spade";
 		}
 		else if(suit == 2){
 			suitString = "club";
 		}
 		else{
 			suitString = "diamond"
 		}
 		if(value == 11){
 			value = "J"
 		}
 		else if(value == 12){
 			value = "Q"
 		}
 		else if(value == 13){
 			value = "K" 
 		}
 		else if(value == 1){
 			value = "A"
 		}
 		output = first + value + middle1 + suitString + middle2 + value + end;

 		document.getElementById("gameTable").innerHTML += output;
	}
});