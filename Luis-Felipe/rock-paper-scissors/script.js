let playerScore = 0;
let computerScore = 0;

const opitions = ["rock", "paper", "scissors"];

const buttons = document.querySelectorAll('.option');

// Selecionando os elementos corretos do HTML
const displayTextarea = document.getElementById('display-text');
const playerScoreText = document.getElementById('player-score');
const computerScoreText = document.getElementById('computer-score');

function computerChoose() {
    const randomIndex = Math.floor(Math.random() * opitions.length);
    return opitions[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return `It's a tie!\nBoth chose ${playerSelection}.`;
    }
    if ((playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {
        playerScore++;
        return `You win!\n${playerSelection} beats ${computerSelection}.`;
    } else {
        computerScore++;
        return `You lose!\n${computerSelection} beats ${playerSelection}.`;
    }
}

// Escutando o clique dos botões
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const playerSelection = opitions[index];
        const computerSelection = computerChoose();
        const result = playRound(playerSelection, computerSelection);
        
        // Exibe o resultado dentro da Textarea mudando o .value
        displayTextarea.value = result;
        
        // Atualiza o placar na tela
        playerScoreText.textContent = `Player Score: ${playerScore}`;
        computerScoreText.textContent = `Computer Score: ${computerScore}`;
    });
});
