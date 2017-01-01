var minimumRadius = 0.5;
var maximumRadius = 100;
var defaultRadius = 10;
var interval = 2;
var radiusSpan = document.getElementById("radiusValue");
var decreaseRadius = document.getElementById("decreaseRadius");
var increaseRadius = document.getElementById("increaseRadius");

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