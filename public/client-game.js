var socket = io.connect("http://localhost:4000");

function startGame(){
	socket.emit('start',{
		status: true
	});
}