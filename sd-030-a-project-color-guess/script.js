const corASerAdivinhada = document.querySelector('#rgb-color');
const bolasDeAdivinhar = document.querySelectorAll('.ball');
const answer = document.querySelector('#answer');
const randomNum = Math.floor(Math.random() * 6);
const red = Math.floor(Math.random() * 255);
const green = Math.floor(Math.random() * 255);
const blue = Math.floor(Math.random() * 255);
corASerAdivinhada.innerText = `rgb(${red}, ${green}, ${blue})`;
const buttonReset = document.querySelector('#reset-game');
const placar = document.querySelector('#score');
let scoreGame = 0;

function placarDoJogo() {
  scoreGame += 3;
  placar.innerHTML = `Placar: ${scoreGame}`;
  localStorage.setItem('score', JSON.stringify(scoreGame));
}

function getRandomNumber() {
  scoreGame = JSON.parse(localStorage.getItem('score')) || 0;
  placar.innerHTML = `Placar: ${scoreGame}`;
  for (let i = 0; i < bolasDeAdivinhar.length; i += 1) {
    if (i === randomNum) {
      bolasDeAdivinhar[i].style.backgroundColor = `${corASerAdivinhada.innerHTML}`;
    } else {
      bolasDeAdivinhar[i].style.backgroundColor = `rgb(${Math.floor(Math.random() * (255))},
  ${Math.floor(Math.random() * (255))},
  ${Math.floor(Math.random() * (255))})`;
    }
  }
}

bolasDeAdivinhar.forEach((item) => {
  item.addEventListener('click', (event) => {
    if (event.target.style.backgroundColor === corASerAdivinhada.innerText) {
      placarDoJogo();
      answer.innerHTML = 'Acertou!';
    } else {
      answer.innerHTML = 'Errou! Tente novamente!';
    }
  });
});

buttonReset.addEventListener('click', () => {
  localStorage.setItem('score', scoreGame);
  window.location.reload();
});

window.onload = () => getRandomNumber();
