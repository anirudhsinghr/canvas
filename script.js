var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 10;
var dragging = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineWidth = radius * 2;

function putPoint (e) {

	e.preventDefault();
	if (dragging) {
		context.lineTo(e.pageX, e.pageY);
		context.stroke();
		context.beginPath();
		context.arc(e.pageX, e.pageY, radius, 0, 2 * Math.PI);
		context.fill();
		context.beginPath();
		context.moveTo(e.pageX, e.pageY);
	}
}

function mobilePutPoint (e) {

	e.preventDefault();
	if (dragging) {
		context.lineTo(e.touches[0].pageX, e.touches[0].pageY);
		context.stroke();
		context.beginPath();
		context.arc(e.touches[0].pageX, e.touches[0].pageY, radius, 0, 2 * Math.PI);
		context.fill();
		context.beginPath();
		context.moveTo(e.touches[0].pageX, e.touches[0].pageY);
	}
}

function engage (e) {
	e.preventDefault();
	dragging = true;
	if (e.type == "mousedown") {
		putPoint(e);
	} else if (e.type == "touchstart") {
		mobilePutPoint(e);
	}
}

function disengage (e) {
	e.preventDefault();
	dragging = false;
	context.beginPath();
}

canvas.addEventListener('touchstart', engage, false);
canvas.addEventListener('touchend', disengage, false);
canvas.addEventListener('touchmove', mobilePutPoint, false);

canvas.addEventListener('mousedown', engage, false);
canvas.addEventListener('mouseup', disengage, false);
canvas.addEventListener('mousemove', putPoint, false);

document.getElementById("reset").onclick = function () { canvas.width = canvas.width; setRadius(10); }
document.getElementById("save").onclick = function () {
	window.location = canvas.toDataURL('image/png');
};