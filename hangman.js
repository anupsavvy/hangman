/* 	
	Copyright 2017 Anup Sawant. All rights reserved. 
	@author: anupsawant
	@info: javascript for hangman game
*/

var imageCounter = 2;
var all_words = ["coding","bootcamp","javascript","html","css","python","django"];
var previous_word = "";
var current_word = all_words[Math.floor(Math.random()*all_words.length)];
var empty_word_array = [];

function start(){
	alert("hi");
	imageCounter = 2;
	create_random_word();
	createSpaces();
}

window.onload = function (){
	start();	
};

function clearSpaces(){

}
/*
	This function creates spaces on html webpage according to 
	randomly chosen word size.
	@param : None
	@return : None
*/
function createSpaces(){
	for (var i = 0; i < current_word.length; i++){
		empty_word_array.push("__");
	}
	var spaces = document.getElementById("spaces");
	spaces.innerHTML = empty_word_array.join("	");
}

/*
	This function returns a random word from all words
	@params : None
	@returns : None 
*/
function create_random_word(){
	current_word = all_words[Math.floor(Math.random()*all_words.length)];
	while (previous_word === current_word){
		current_word = all_words[Math.floor(Math.random()*all_words.length)];
	}
	previous_word = current_word;
}

/*
	This function helps change the hangman image on webapage
	@params : None
	@returns : None
*/
function animateHangman(){
	var image = document.getElementById('hangman-animation');
	if (imageCounter <= 7){
		image.src = "./images/hangman0"+imageCounter+".png";
	}else{
		image.src = "./images/hangman0"+imageCounter+".gif";
	}
	imageCounter += 1;
}


