var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 10;
var dragging = false;
var minimumRadius = 0.5;
var maximumRadius = 100;
var defaultRadius = 10;
var interval = 2;
var radiusSpan = document.getElementById("radiusValue");
var decreaseRadius = document.getElementById("decreaseRadius");
var increaseRadius = document.getElementById("increaseRadius");
var swatches = document.getElementsByClassName("swatch");
var add = document.getElementById("add");

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


function setRadius (newRadius) {

	if (newRadius < minimumRadius) {
		newRadius = minimumRadius;
	} else if (newRadius > maximumRadius) {
		newRadius = maximumRadius;
	}

	radius = newRadius;
	context.lineWidth = radius * 2;
	radiusSpan.innerHTML = radius;
}

decreaseRadius.addEventListener("click", function () {
	setRadius(radius - interval);
});

increaseRadius.addEventListener("click", function () {
	setRadius(radius + interval);
});

setRadius(defaultRadius);

for (var i = 0, n = swatches.length; i < n; i++) {
	swatches[i].addEventListener("click" ,setSwatch);
}

function setColor (color) {
	context.fillStyle = color;
	context.strokeStyle = color;
	var active = document.getElementsByClassName("active")[0];
	if (active) {
		active.className = "swatch";
	}
}

function setSwatch (e) {
	var swatch = e.target;
	setColor(swatch.style.backgroundColor);
	swatch.className += " active";
}


add.addEventListener("click", function (e) {
	var color = prompt("Enter Color Name or HexCode: ");
	setColor(color);
});

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

(function setBgColor () {
	document.getElementById("black").style.backgroundColor = "black";
	document.getElementById("red").style.backgroundColor = "red";
	document.getElementById("green").style.backgroundColor = "green";
	document.getElementById("blue").style.backgroundColor = "blue";
})(); 
