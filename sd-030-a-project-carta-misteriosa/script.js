const buttonGeraCarta = document.querySelector('#criar-carta');
const textoP = document.querySelector('#carta-gerada');
const inputText = document.querySelector('#carta-texto');
const contador = document.querySelector('#carta-contador');

const arr1 = ['newspaper', 'magazine1', 'magazine2'];
const arr2 = ['medium', 'big', 'reallybig'];
const arr3 = ['rotateleft', 'rotateright'];
const arr4 = ['skewleft', 'skewright'];

function geraEstiloAleatorio() {
  const randomIndex1 = Math.floor(Math.random() * arr1.length);
  const randomIndex2 = Math.floor(Math.random() * arr2.length);
  const randomIndex3 = Math.floor(Math.random() * arr3.length);
  const randomIndex4 = Math.floor(Math.random() * arr4.length);
  const randomValue1 = arr1[randomIndex1];
  const randomValue2 = arr2[randomIndex2];
  const randomValue3 = arr3[randomIndex3];
  const randomValue4 = arr4[randomIndex4];
  return [randomValue1, randomValue2, randomValue3, randomValue4];
}

function checkNull() {
  return inputText.value.trim().length === 0;
}

function geraCarta() {
  const check = checkNull();
  let estiloAleatorio = '';
  if (!check) {
    const input = inputText.value;
    const result = input.split(' ');
    textoP.innerHTML = '';
    for (let i = 0; i < result.length; i += 1) {
      const createElement = document.createElement('span');
      estiloAleatorio = geraEstiloAleatorio();
      estiloAleatorio.forEach((item) => {
        createElement.classList.add(item);
      });
      createElement.innerHTML = `${result[i]}`;
      textoP.appendChild(createElement);
    }
    contador.innerHTML = `${parseInt(result.length, 10)}`;
  } else { textoP.innerHTML = 'Por favor, digite o conteúdo da carta.'; }
}

buttonGeraCarta.addEventListener('click', geraCarta);
textoP.addEventListener('click', (event) => {
  const element = event;
  element.target.classList = '';
  const arr = geraEstiloAleatorio();
  arr.forEach((item) => {
    element.target.classList.add(item);
  });
});
