/* 	
	Copyright 2017 Anup Sawant. All rights reserved. 
	@author: anupsawant
	@info: javascript for hangman game
*/

var imageCounter = 2;
var all_words = ["coding","bootcamp","javascript","html","css","python","django","react","heroku","git"];
var previous_word = "";
var current_word = all_words[Math.floor(Math.random()*all_words.length)];
var empty_word_array = [];
var no_of_attempts_left = 7;
var letter_count = {};
var letter_incremental_index = {};
var wins = 0;
var losses = 0;

/*
	starts the game
	@params : None
	@returns : None
*/
function start(){
	imageCounter = 1;
	previous_word = "";
    current_word = all_words[Math.floor(Math.random()*all_words.length)];
    empty_word_array = [];
    no_of_attempts_left = 7;
    letter_count = {};
    letter_incremental_index = {};
    document.getElementById("next-game").style.visibility='hidden';
    animateHangman();
	create_random_word();
	createSpaces();
}

window.onload = function (){
	start();	
};

/*
	Clears the red background color of buttons
	@params : None
	@returns : None
*/
function nextGame(){
	var letters = document.getElementsByClassName("letter");
    for(var letter of letters){
    	letter.style.backgroundColor = 'rgba(13, 114, 11, 0.1)';
    }
    start();
}

/*
	Clears spaces
	@params : None
	@returns : None
*/
function update_spaces_and_letters_on_screen(){
	var spaces = document.getElementById("spaces");
	spaces.innerHTML = empty_word_array.join("	");
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
	update_spaces_and_letters_on_screen();
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
	/* Keep count of each letter in dictionary */
	for (var i = 0; i < current_word.length; i++){
		if (typeof letter_count[current_word[i]] === 'undefined'){
			letter_count[current_word[i]] = 1;
		}else{
			var count = letter_count[current_word[i]];
			letter_count[current_word[i]] = count + 1;
		}
		letter_incremental_index[current_word[i]] = -1;
	}
	console.log(letter_count);
}

/*
	This function helps change the hangman image on webapage
	@params : None
	@returns : None
*/
function animateHangman(){
	var image = document.getElementById('hangman-animation');
	var attempts = document.getElementById('attempts');

	if (imageCounter <= 7){
		image.src = "./images/hangman0"+imageCounter+".png";
		no_of_attempts_left = no_of_attempts_left - 1;
		attempts.innerHTML = no_of_attempts_left; 
	}else{
		image.src = "./images/hangman0"+imageCounter+".gif";
		if(imageCounter === 8){
			losses++;
			document.getElementById("losses").innerHTML = " losses : " + losses;
			document.getElementById("next-game").style.visibility='visible';
		}
	}
	imageCounter += 1;
}

/*
	This function finds the index of a character, if duplicate
	@params : startindex, letter clicked by user
	@returns : None
*/
function get_duplicate_letter_index(startindex,letter_clicked_by_user){
	var index = -1;
	for (var i = startindex+1; i < current_word.length; i++){
		if(current_word[i] === letter_clicked_by_user){
			index = i;
			break;
		}
	}
	return index;
}

/*
	This function defines the logic of hangman game
	@params : letter character
	@returns : None
*/
function matchLetter(letter){
	var letter_clicked_by_user = letter.innerHTML;
	var letter_index_in_empty_word = letter_incremental_index[letter_clicked_by_user];
	var letter_index = -1;

	if (typeof letter_count[letter_clicked_by_user] !== 'undefined' && letter_count[letter_clicked_by_user] > 0) {
			letter_index = get_duplicate_letter_index(letter_index_in_empty_word,letter_clicked_by_user);
	}

	/* if letter is found */
	if(letter_index > -1){
		empty_word_array[letter_index] = letter_clicked_by_user;
		update_spaces_and_letters_on_screen();

		/* update dictionaries */ 
		var count = letter_count[letter_clicked_by_user];
		letter_count[letter_clicked_by_user] = count - 1;
		letter_incremental_index[letter_clicked_by_user] = letter_index;
		if(empty_word_array.indexOf('__') === -1){
			imageCounter = 9;
			wins++;
			document.getElementById("wins").innerHTML = " wins : " + wins;
			document.getElementById("next-game").style.visibility='visible';
			animateHangman();
		}
	}else{ // if letter is not found
		letter.style.backgroundColor = "#fb656b";
		animateHangman();
	}
}


