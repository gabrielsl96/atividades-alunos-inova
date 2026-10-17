let playerScore = 0;
let computerScore = 0;

const options = ["pedra", "papel", "tesoura"];


const buttons = document.querySelectorAll("#opcoes button");
const resetButton = document.getElementById("reset");

const resultDisplay = document.getElementById("resultado");
const scoreDisplay = document.getElementById("score");


function computerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}


function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return `Empate! Ambos escolheram ${playerSelection}.`;
    }

    if ((playerSelection === "pedra" && computerSelection === "tesoura") ||
        (playerSelection === "papel" && computerSelection === "pedra") ||
        (playerSelection === "tesoura" && computerSelection === "papel")) {
        playerScore++;
        return `Você ganhou! ${playerSelection} ganha de ${computerSelection}.`;
    }

    computerScore++;
    return `Você perdeu! ${computerSelection} ganha de ${playerSelection}.`;
}


function updateScore() {
    if (scoreDisplay) {
        scoreDisplay.textContent = `Jogador: ${playerScore} | Computador: ${computerScore}`;
    }
}


buttons.forEach(button => { 
    button.addEventListener("click", () => {
        const playerSelection = button.id;
        const computerSelection = computerChoice();
        
       
        const resultText = playRound(playerSelection, computerSelection);
        if (resultDisplay) {
            resultDisplay.textContent = resultText;
        }
        
        
        updateScore();
    });
});


if (resetButton) {
    resetButton.addEventListener("click", () => {
        playerScore = 0;
        computerScore = 0;
        updateScore();
        if (resultDisplay) {
            resultDisplay.textContent = "Jogo reiniciado! Escolha uma opção.";
        }
    });
}
