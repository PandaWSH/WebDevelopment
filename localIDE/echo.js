//define a user-defined function echo()

function echo(str,num){
	for (var i =0; i < num;i++){
	console.log(str);
	}
}

echo("Echo!!!!", 10)
echo("Tater tos",3)

function averageScore(scores){
	n = scores.length;
	//add all scores together
	var total =0;
	scores.forEach(function(score){
		total += score; //the same as for-loop
	});
	//divide
	avg = total/scores.length;
	//round
	return Math.round(avg);
}

var scores = [1,2,3,4,5,6,7,8,9,10];
console.log(averageScore(scores));

