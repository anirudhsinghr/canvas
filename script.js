var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 10;
var dragging = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineWidth = radius * 2;

function putPoint (e) {
	if (dragging) {
		context.lineTo(e.clientX, e.clientY);
		context.stroke();
		context.beginPath();
		context.arc(e.clientX, e.clientY, radius, 0, 2 * Math.PI);
		context.fill();
		context.beginPath();
		context.moveTo(e.clientX, e.clientY);
	}
}

function engage (e) {
	dragging = true;
	putPoint(e);
}

function disengage () {
	dragging = false;
	context.beginPath();
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mouseup', disengage);
canvas.addEventListener('mousemove', putPoint);