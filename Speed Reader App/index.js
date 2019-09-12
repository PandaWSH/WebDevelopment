$(function() {
	var textArray;
	var inputLength;

	$("#new").hide();
	$("#resume").hide();
	$("#pause").hide();
	$("#controls").hide();
	$("#result").hide();
	$("#error").hide();

	// click on "start" to start reading
	$('start').click(function(){
		//get text and split into array
		textArray = $("#userInput").val().split(/\s+/); // \s matches space, line, etc
		inputLength = textArray.length();

		//conditions
		if(inputLength>1){

		}else{
			$('error') //show error message because no enough input content
		}
	});

//

});