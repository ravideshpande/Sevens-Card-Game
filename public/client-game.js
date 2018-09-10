var socket = io.connect("http://localhost:4000");

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