var swatches = document.getElementsByClassName("swatch");
var add = document.getElementById("add");

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