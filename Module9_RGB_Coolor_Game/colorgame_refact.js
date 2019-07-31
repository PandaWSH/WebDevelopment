var numberOfBox = 6; //tracker of number of boxes
var colors = [];

var boxes = document.querySelectorAll(".box");
var pickedcolor = pickColor();
var colordisplay = document.getElementById("colordisplay");
var messagedisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var modeButton = document.querySelectorAll(".mode");

init();

function init(){
	// mode buttons event listener	
	for (var i = 0; i < modeButton.length; i++){
		modeButton[i].addEventListener("click", function(){
			// turn the inital one off
			modeButton[0].classList.remove("selected");
			modeButton[1].classList.remove("selected");
			this.classList.add("selected");

			this.textContent === "Easy" ? numberOfBox = 3: numberOfBox = 6;
			resetfunc();		
		});
	}
}


function resetfunc() {
	messagedisplay.textContent = " ";
	// generate new colors
	colors = generateColor(numberOfBox);
	// pick the target color
	pickedcolor = pickColor();
	reset.textContent = "New color";
	// change color displayed to match picked one
	colordisplay.textContent = pickedcolor;
	// update boxes color
	for(var i = 0; i < boxes.length; i++){
		if (colors[i]){
		boxes[i].style.backgroundColor = colors[i];
	}
		else{
			boxes[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";

	for (var i = 0; i < boxes.length; i++){
	//add initial colors to boxes
	// NO NEED because we now have resetfunt()
	//boxes[i].style.backgroundColor = colors[i] //loop through all colors

	//click boxes
	boxes[i].addEventListener("click", function(){
		//grab color from selected box
		var clickedcolor = this.style.backgroundColor;
		if (clickedcolor === pickedcolor){
		messagedisplay.textContent = "you win!";
		reset.textContent = "Another turn?";
		changecolor(pickedcolor);
		h1.style.backgroundColor = clickedcolor;
		}
		else{
			this.style.backgroundColor = "#232323";
			messagedisplay.textContent = "Try again!";
		}
	});
}
}

reset.addEventListener("click", function(){
	messagedisplay.textContent = " ";
	// generate new colors
	colors = generateColor(numberOfBox);
	// pick the target color
	pickedcolor = pickColor();
	reset.textContent = "New color"
	// change color displayed to match picked one
	colordisplay.textContent = pickedcolor;
	// update boxes color
	for(var i = 0; i < boxes.length; i++){
		boxes[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "steelblue";
})

colordisplay.textContent = pickedcolor;

function changecolor(color){
	// loop through all boxes
	for (var i = 0; i < boxes.length; i++){
		boxes[i].style.backgroundColor = color;
	}
	//
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length)
	return colors[random];
}

function generateColor(num){
	var arr = [];
	for (var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
}


function randomColor(){
	//pick a red from 0-255, grenn from 0-255 and a blue
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; //make up "rgb(#,#,#)"

}