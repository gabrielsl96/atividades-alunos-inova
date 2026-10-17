let playerScore = 0;
let computerScore = 0;

const options = ["pedra", "papel", "tesoura"];

const buttons = [
  document.getElementById("rock"),
  document.getElementById("paper"),
  document.getElementById("scissors"),
];

const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");

function computerChoice() {
  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "E";
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

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const playerSelection = options[index];
    const computerSelection = computerChoice();

    const result = playRound(playerSelection, computerSelection);

    if (result === "V") {
      resultText.innerHTML = `Você venceu! <strong>${playerSelection}</strong> vence <strong>${computerSelection}</strong>.`;
    } else if (result === "D") {
      resultText.innerHTML = `Você perdeu! <strong>${computerSelection}</strong> vence <strong>${playerSelection}</strong>.`;
    } else {
      resultText.innerHTML = `Empate! Ambos escolheram <strong>${playerSelection}</strong>.`;
    }

    scoreText.textContent = `Pontuação - Você: ${playerScore}, Computador: ${computerScore}`;
  });
});