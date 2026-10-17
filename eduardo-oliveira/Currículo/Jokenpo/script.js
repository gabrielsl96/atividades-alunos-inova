let playerScore = 0;
let computerScore = 0;
const choices = ['pedra', 'papel', 'tesoura'];

function jogar(playerChoice) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];
    
    let resultado = playRound(playerChoice, computerChoice);
    
    document.getElementById('resultado').innerText = `Você escolheu ${playerChoice} e o computador escolheu ${computerChoice}. ${resultado}`;
    document.getElementById('placar').innerText = `Jogador: ${playerScore} | Computador: ${computerScore}`;
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "Empate!";
    }
    
    if (
        (playerChoice === 'pedra' && computerChoice === 'tesoura') ||
        (playerChoice === 'papel' && computerChoice === 'pedra') ||
        (playerChoice === 'tesoura' && computerChoice === 'papel')
    ) {
        playerScore++;
        return "Você venceu!";
    }
    
    computerScore++;
    return "O Computador venceu!";
}
