var socket = io.connect("http://localhost:4000");

function setName(){
	var playerName = document.getElementById("playerName").value;
	console.log(playerName);
	socket.emit('name',{
		name: playerName
	});
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