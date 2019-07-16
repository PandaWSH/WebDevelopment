var todos = ["Finish this class"];

var input = prompt("what do you want to do?");


while (input != "quit"){
	if (input === "list"){
		showlist();
	}

	else if (input === "new"){
		addnew();
	}
	else if (input == "delete"){
		deletelist();
	}

	input = prompt("what do you want to do?");
}

console.log("You've quit!");

function showlist(){
	console.log("*************");
	todos.forEach(function(todo,i){
			console.log(i + ": " + todo);
		});
	console.log("*************");
}

function addnew(){
	var newtodo = prompt("what to you want to add?")
		todos.push(newtodo);
}

function deletelist(){
	var pos = Number(prompt("what to you want to delete?"));
		todos.splice(pos,1);
}