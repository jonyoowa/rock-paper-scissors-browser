// Script controlling flow of logic for Rock, Paper, Scissors

// Buttons
const rock = document.getElementById("rock_button");
const paper = document.getElementById("paper_button");
const scissors = document.getElementById("scissors_button");
const rps_button = document.getElementsByClassName("rps_button");

// Game Status Info
const result_text = document.getElementById("result_text");
const score_text = document.getElementById("score_text");

const winlose_text = document.getElementById("winlose_text");
const refresh_text = document.getElementById("refresh_text");

// Game Statistics
var playerWins = 0;
var computerWins = 0;
var ties = 0;
var gameEnded = false;
const totalRounds = 5;

addButtonFunctionality();

function playRound(playerChoice) { 
	// Do not play if game is already over
	if (!gameEnded) {

		const computer = computerPlay(); 

		// Play a round 
		let result = calculateWinner(playerChoice, computer);

		if (result === "win") {
			++playerWins;
		} else if (result === "lose") {
			++computerWins;
		} else if (result === "tie") {
			++ties;
		} else {
			console.log("Something went wrong...");
		}

		// Display win/loss/tie record
		score_text.innerHTML = `Player has ${playerWins} wins and computer has ${computerWins} wins. There are ${ties} ties.`;
		
		if (checkGameEnded()) {
			winlose_text.innerHTML = `Game Over!`;
			if (playerWins === totalRounds) {
				refresh_text.innerHTML = "You have won the game!";
			} else if (computerWins == totalRounds) { 
				refresh_text.innerHTML = "Too bad! The computer won the game. Better luck next time.";
			} else {
				refresh_text.innerHTML = "Something went wrong...";
			}

			//removeButtonFunctionality();
			playerWins, computerWins, ties = 0;
			revealRestartButton();
			removeButtonFunctionality();
		}
	}

	// Logic Functions // 

	// Computer play
	function computerPlay() {
		let choice = Math.floor(Math.random() * 3);
		let possibleChoices = ["rock", "paper", "scissors"];
		return possibleChoices[choice];
	}

	// Round functions 
	// 
	function calculateWinner(playerSelection, computerSelection) {
		if (playerSelection === computerSelection) {

			let tie_audio = new Audio("./sounds/result_tie.wav");
			tie_audio.play(); 
			result_text.innerHTML = `Tie! You both chose ${playerSelection}!`;
			return "tie";

		} else if ((playerSelection === "rock" && computerSelection === "scissors")
			|| (playerSelection === "scissors" && computerSelection === "paper")
			||(playerSelection === "paper" && computerSelection === "rock")) {

			let win_audio = new Audio("./sounds/result_win.wav");
			win_audio.play(); 
			result_text.innerHTML = `You won, ${playerSelection} beats ${computerSelection}`;
			return "win";

		} else if ((computerSelection === "rock" && playerSelection === "scissors")
			|| (computerSelection === "scissors" && playerSelection === "paper")
			||(computerSelection === "paper" && playerSelection === "rock")) {

			let lose_audio = new Audio("./sounds/result_lose.wav");
			lose_audio.play(); 
			result_text.innerHTML = `You lost, ${computerSelection} beats ${playerSelection}`;
			return "lose"; 

		} else {
			result_text.innerHTML.log("Something went wrong... try again");
		}
	}

	// Check if the either player has won the max $ of rounds needed
	function checkGameEnded() {
		return (playerWins === totalRounds || computerWins === totalRounds);
	}
}

// UI Control Functionality
function addButtonFunctionality() {
	activateEffects();

	rock.addEventListener("click", function() { playRound("rock"); });
	paper.addEventListener("click", function() { playRound("paper"); });
	scissors.addEventListener("click", function() { playRound("scissors"); });

	gameEnded = false;

	function activateEffects() {
		for (let i = 0; i < rps_button.length; ++i) {
			rps_button[i].addEventListener("mousemove", function() { this.style.opacity = 0.5; });
			rps_button[i].addEventListener("mouseleave", function() { this.style.opacity = 1.0; });
			rps_button[i].onclick = function() {
				this.style.transition = "all 0.5s ease-in-out";
				this.style.transform = "rotate(360deg)";
			}
		}
	}
}

function removeButtonFunctionality() {
	rock.disabled = true;
	paper.disabled = true;
	scissors.disabled = true;

	rock.style.opacity = 0.5;
	paper.style.opacity = 0.5;
	scissors.style.opacity = 0.5;	

	gameEnded = true;
}

function revealRestartButton() {
	let restartText = document.createElement("h2");
	restartText.innerHTML = "<h2>Refresh or click on the button below to play again:</h2>";
	restartText.setAttribute("id", "restart_text");
	restartText.style.margin = "12px auto"; 

	document.getElementById("final_area").appendChild(restartText);

	let button = document.createElement("button");
	button.innerHTML = "Reset";
	button.setAttribute("id", "restart_button");
	button.style.height = "3em";
	button.style.width = "8em";
	button.style.margin = "6px auto"; 
	button.style.border = "3px solid black"; 
	button.style.borderRadius = "1em"
    button.style.backgroundColor = "#428BCA";

    button.onmouseover = function () { 
    	this.style.border = "5px solid #black"; 
    	this.style.font = "bold";
    	this.style.opacity = 0.75;

    }
	button.onmouseout = function () { 
		this.style.border = "3px solid black"; 
    	this.style.font = "";
    	this.style.opacity = 1;
	}

	button.onclick = function() {
		location.reload();
	}

	document.getElementById("final_area").appendChild(button);
}