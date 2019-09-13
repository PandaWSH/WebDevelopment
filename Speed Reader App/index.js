$(function() {
	var textArray;
	var inputLength;
	var reading = false; //initialize the reading condition
	var counter;
	var action;
	var frequency=200; 

	$("#new").hide();
	$("#resume").hide();
	$("#pause").hide();
	$("#controls").hide();
	$("#result").hide();
	$("#error").hide();

	// click on "start" to start reading
	$('#start').click(function(){
		//get text and split into array
		textArray = $("#userInput").val().split(/\s+/); // \s matches space, line, etc
		inputLength = textArray.length;

		//conditions
		if(inputLength>1){ //if there is some text input

			reading = true; //will read

			//hide relative buttons and show relative buttons
			$("#start").hide();
			$("#error").hide();
			$("#userInput").hide();
			$("#new").show();
			$("#pause").show();
			$("#controls").show();

			//set slider max
			$("#progressslider").attr("max",inputLength-1);

			//initialize the variable counter at zero
			counter = 0;

			//show reading box with the first word
			$('#result').show();
			$('#result').text(textArray[counter]);

			//start reading from the 1st word
			action = setInterval(read, frequency);
			
			
		}else{
			$('error').show; //show error message because there's no enough input content
		}
	});


// click on new
$("#new").click(function(){
	//reload the page
	location.reload();
});

// click on pause
$("#pause").click(function(){
	//stop reading
	clearInterval(action);
	reading = false;

	//hide pause and show resume
	$("#pause").hide();
	$("#resume").show();
});

// click on resume
$("#resume").click(function(){
	//stop reading
	action = setInterval(read, frequency);
	reading = true;

	//hide pause and show resume
	$("#resume").hide();
	$("#pause").show();
});

//change the fontsize
$("#fontsizeslider").on("slidestop",function(event,ui){
	//refresh the slider
	$("#fontsizeslider").slider("refresh");

	//get the value of the slider
	var slidervalue = parseInt($("#fontsizeslider").val());

	$("#result").css("fontSize",slidervalue);
	$("#fontsize").text(slidervalue);
});

// change the reading speed
$("#speedslider").on("slidestop",function(event,ui){
	//refresh the slider
	$("#speedslider").slider("refresh");

	//get the value of the slider
	var slidervalue = parseInt($("#speedslider").val());

	$("#speed").text(slidervalue);

	// stop reading
	clearInterval(action);

	//change frequency
	frequency = 60000/slidervalue;

	//resume reading if we're in reading mode
	if(reading){
		action = setInterval(read,frequency);
	}

});


//************* function section *************
function read(){
	if(counter == inputLength-1){ //no content OR finished
		clearInterval(action);
		reading = false; //move to none reading mode
		$("#pause").hide();
	}else{
		//counter goes up by one
		counter++;

		//get word
		$("#result").text(textArray[counter]);

		//changing progress slider value & refresh as well
		$("#progressslider").val(counter);
		$("#progressslider").slider('refresh');

		//change text of percentage
		$("#percentage").text(Math.floor(counter/(inputLength-1)*100));
	}
}

});