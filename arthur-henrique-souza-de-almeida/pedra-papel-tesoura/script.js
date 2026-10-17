let playerScore = 0;
let computerScore = 0;

const options = ["pedra", "papel", "tesoura"];

const buttons = document.querySelectorAll("button[data-choice]");
const resetButton = document.getElementById("reset");

const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");

function computerChoice() {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "Empate!";
    }

    if (
        (playerSelection === "pedra" && computerSelection === "tesoura") ||
        (playerSelection === "papel" && computerSelection === "pedra") ||
        (playerSelection === "tesoura" && computerSelection === "papel")
    ) {
        playerScore++;
        return "V";
    }

    computerScore++;
    return "D";
}

function updateScore() {
    scoreText.textContent = `Pontuação - Você: ${playerScore}, Computador: ${computerScore}`;
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const playerSelection = button.dataset.choice;
        const computerSelection = computerChoice();
        const result = playRound(playerSelection, computerSelection);

        if (result === "V") {
            resultText.textContent = `Você venceu! Você escolheu ${playerSelection} e o computador escolheu ${computerSelection}.`;
        } else if (result === "D") {
            resultText.textContent = `Você perdeu! Você escolheu ${playerSelection} e o computador escolheu ${computerSelection}.`;
        } else {
            resultText.textContent = `Empate! Você e o computador escolheram ${playerSelection}.`;
        }

        updateScore();
    });
});

resetButton.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    resultText.textContent = "Jogo reiniciado!";
    updateScore();
});

