var colors = generateColor(6);

var boxes = document.querySelectorAll(".box");
var pickcolor = pickColor();
var colordisplay = document.getElementById("colordisplay");
var messagedisplay = document.querySelector("#message");

colordisplay.textContent = pickcolor;

for (var i = 0; i < boxes.length; i++){
	//add initial colors to boxes
	boxes[i].style.backgroundColor = colors[i] //loop through all colors

	//click boxes
	boxes[i].addEventListener("click", function(){
		//grab color from selected box
		var clickedcolor = this.style.backgroundColor;
		if (clickedcolor === pickcolor){
		messagedisplay.textContent = "you win!";
		changecolor(pickcolor);
		}
		else{
			this.style.backgroundColor = "#232323";
			messagedisplay.textContent = "Try again!";
		}
	});
}

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
	return "rgb(" + r + "," + g + "," + b + ")"; //make up "rgb(#,#,#)"

}

// ***************************** basic version 2 *****************************
// determine if there correct color was picked, change relative places into correct color if correct
// var colors = [
// "rgb(255, 0, 0)",
// "rgb(255, 255, 0)",
// "rgb(0, 255, 0)",
// "rgb(0, 255, 255)",
// "rgb(0, 0, 255)",
// "rgb(255, 0, 255)"
// ] //hardcode version

// var boxes = document.querySelectorAll(".box");
// var pickcolor = colors[3];
// var colordisplay = document.getElementById("colordisplay");
// var messagedisplay = document.querySelector("#message");

// colordisplay.textContent = pickcolor;

// for (var i = 0; i < boxes.length; i++){
// 	//add initial colors to boxes
// 	boxes[i].style.backgroundColor = colors[i] //loop through all colors

// 	//click boxes
// 	boxes[i].addEventListener("click", function(){
// 		//grab color from selected box
// 		var clickedcolor = this.style.backgroundColor;
// 		if (clickedcolor === pickcolor){
// 			alert("you win!");
// 		changecolor(pickcolor);
// 		}
// 		else{
// 			this.style.backgroundColor = "#232323";
// 			messagedisplay.textContent = "Try again!";
// 		}
// 	});
// }

// function changecolor(color){
// 	// loop through all boxes
// 	for (var i = 0; i < boxes.length; i++){
// 		boxes[i].style.backgroundColor = color;
// 	}
// 	//
// }

// ***************************** basic version 1 ***************************** 
// set up the environment, boxes, click alerts. etc
// var colors = [
// "rgb(255, 0, 0)",
// "rgb(255, 255, 0)",
// "rgb(0, 255, 0)",
// "rgb(0, 255, 255)",
// "rgb(0, 0, 255)",
// "rgb(255, 0, 255)"
// ] //hardcode version

// var boxes = document.querySelectorAll(".box");
// var pickcolor = colors[3];
// var colordisplay = document.getElementById("colordisplay");


// colordisplay.textContent = pickcolor;

// for (var i = 0; i < boxes.length; i++){
// 	//add initial colors to boxes
// 	boxes[i].style.backgroundColor = colors[i] //loop through all colors

// 	//click boxes
// 	boxes[i].addEventListener("click", function(){
// 		//grab color from selected box
// 		var clickedcolor = this.style.backgroundColor;
// 		if (clickedcolor == pickcolor){
// 			alert("you win!");
// 		}
// 		else{
// 			alert("wrong");
// 		}


// 	});
// }