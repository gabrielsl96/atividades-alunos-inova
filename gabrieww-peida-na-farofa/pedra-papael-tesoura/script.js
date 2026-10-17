let playerScore = 0;
let computersScore = 0;

const options = ["pedra", "papel", "tesoura"];

const buttons = document.querySelectorAll("button");

function computerPlay() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
 }


function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "Empate!";
  }

  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    playerScore++;
    return "Vitória do jogador!";
  }

  computersScore++;
  return "Vitória do computador!";
}


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const playerSelection = options[index]; 
        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection );)};

        if (result === "Vitória do jogador!"){

        }