var p1button = document.querySelector("#player1");
var p2button = document.querySelector("#player2");
var p1Display = document.querySelector("#s1");
var p2Display = document.querySelector("#s2");
var p1score = 0;
var p2score = 0;
var gameOver = false; //work as a end game stopper
var winscore = 5;
var numInput = document.querySelector("input");

var resetButton = document.getElementById("reset");

var winscoreDisplay = document.querySelector("p span"); //select the number in the play up to

p1button.addEventListener("click",function(){
	if (!gameOver){
		p1score ++;
		p1Display.textContent = p1score;
		if (p1score == winscore){
			//p1Display.textContent = winscore; NO NEED
			p1Display.classList.add("winner")
			alert("p1 wins!");
			gameOver = true;
		}}
		
});

p2button.addEventListener("click",function(){
	if (!gameOver){
		p2score ++;
		p2Display.textContent = p2score;
		if (p2score == winscore){
			//p2Display.textContent = winscore;
			p2Display.classList.add("winner")
			alert("p2 wins!");
			gameOver = true;
		}}
		
});

resetButton.addEventListener("click", function(){
	reset();
})

function reset(){
	p1score = 0;
	p2score = 0;
	p1Display.textContent = p1score; //update display
	p2Display.textContent = p2score; //update display
	p1Display.classList.remove("winner"); //remove the winner class css
	p2Display.classList.remove("winner"); //remove the winner class css
	gameOver = false; //allow the game to restart
}

numInput.addEventListener("change", function(){//anytime the value change in the input window
	winscoreDisplay.textContent = this.value;
	winscore = this.value;
	reset(); //everytime there's new input number, the game will reinitialize
	})











