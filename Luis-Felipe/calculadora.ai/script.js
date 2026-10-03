// Seleciona os elementos do HTML usando o ID
const botao = document.getElementById('botao-clique');
const displayContador = document.getElementById('contador-visual');

// Cria uma variável para armazenar o número de cliques
let cliques = 0;

// Adiciona um evento que escuta o clique do usuário no botão
botao.addEventListener('click', () => {
    cliques++; // Soma mais 1 ao total de cliques
    displayContador.textContent = cliques; // Atualiza o texto na tela
});
