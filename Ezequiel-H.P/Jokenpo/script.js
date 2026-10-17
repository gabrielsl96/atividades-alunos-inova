let playerScore = 0;
let computerScore = 0;

const options = ["rock", "paper", "scissors"];

function computerChoice() {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    }

    if ((playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {
        playerScore++;
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    }

    computerScore++;
    return `You lose! ${computerSelection} beats ${playerSelection}.`;
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    const resultText = document.getElementById("result");
    const scoreText = document.getElementById("score");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const playerSelection = button.id;
            const computerSelection = computerChoice();
            const result = playRound(playerSelection, computerSelection);

            resultText.textContent = result;
            scoreText.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
        });
    });
});