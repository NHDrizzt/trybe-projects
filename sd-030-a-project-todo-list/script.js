const clearInput = document.querySelector('input');
const buttonInput = document.querySelector('button');
const segundaListaDeTarefas = document.querySelectorAll('#lista-tarefas');
const primeiraLista = document.querySelector('#lista-tarefas');
const buttonExcluir = document.querySelector('#apaga-tudo');
const buttonRemoveFinalizados = document.querySelector('#remover-finalizados');
const buttonSalvarTarefas = document.querySelector('#salvar-tarefas');
const buttonMoverCima = document.querySelector('#mover-cima');
const buttonMoverBaixo = document.querySelector('#mover-baixo');
const buttonRemoveSelecionado = document.querySelector('#remover-selecionado');
const arrCompleted = [];
const arrNormal = [];

function salvaTarefas() {
  const elements = primeiraLista.querySelectorAll('li');
  elements.forEach((item) => {
    const element = item;
    if (element.classList.contains('completed')) {
      arrCompleted.push(element.innerText);
    }
    arrNormal.push(element.innerText);
  });
  localStorage.setItem('salvaTarefaCompletada', JSON.stringify(arrCompleted));
  localStorage.setItem('salvaTarefaNormal', JSON.stringify(arrNormal));
}

function removeTodosOsBacks() {
  const elements = primeiraLista.querySelectorAll('li');
  elements.forEach((item) => {
    const element = item;
    element.classList.remove('selected');
    element.style.backgroundColor = '';
  });
}

function removeLista() {
  while (primeiraLista.children.length > 0) {
    primeiraLista.removeChild(primeiraLista.lastElementChild);
  }
}

function removeFinalizados() {
  const elements = primeiraLista.querySelectorAll('li');
  elements.forEach((item) => {
    const element = item;
    if (element.classList.contains('completed')) {
      element.remove();
    }
  });
}

segundaListaDeTarefas.forEach((item) => {
  item.addEventListener('click', (event) => {
    const element = event;
    element.target.style.backgroundColor = 'gray';
  });
});

segundaListaDeTarefas.forEach((item) => {
  item.addEventListener('click', (event) => {
    const element = event;
    removeTodosOsBacks();
    element.target.classList.add('selected');
    element.target.style.backgroundColor = 'gray';
  });
});

segundaListaDeTarefas.forEach((item) => {
  item.addEventListener('dblclick', (event) => {
    const element = event;
    if (element.target.classList.contains('completed')) {
      element.target.classList.remove('completed');
    } else {
      element.target.classList.add('completed');
    }
  });
});

function geraLista() {
  const createElement = document.createElement('li');
  createElement.innerText = clearInput.value;
  primeiraLista.appendChild(createElement);
  clearInput.value = '';
}

function checaArray(i, valueNormal, valueCompleted, createElement) {
  for (let j = 0; j < valueCompleted.length; j += 1) {
    if (valueNormal[i].includes(valueCompleted[j])) {
      createElement.classList.add('completed');
    }
  }
}

function geraListaSalva() {
  const valueCompleted = JSON.parse(localStorage.getItem('salvaTarefaCompletada'));
  const valueNormal = JSON.parse(localStorage.getItem('salvaTarefaNormal'));
  for (let i = 0; i < valueNormal.length; i += 1) {
    const createElement = document.createElement('li');
    checaArray(i, valueNormal, valueCompleted, createElement);
    createElement.innerText = valueNormal[i];
    primeiraLista.appendChild(createElement);
  }
  clearInput.value = '';
}

function moverCima() {
  const pegaSelecionado = document.querySelector('.selected');
  if (pegaSelecionado !== null) {
    const elementoPai = pegaSelecionado.parentNode;
    if (pegaSelecionado.previousElementSibling) {
      elementoPai.insertBefore(pegaSelecionado, pegaSelecionado.previousElementSibling);
    }
  }
}

function moverBaixo() {
  const pegaSelecionado = document.querySelector('.selected');
  if (pegaSelecionado !== null) {
    const elementoPai = pegaSelecionado.parentNode;
    if (pegaSelecionado.nextElementSibling) {
      elementoPai.insertBefore(pegaSelecionado.nextElementSibling, pegaSelecionado);
    }
  }
}

function removeSelecionado() {
  const pegaSelecionado = document.querySelector('.selected');
  pegaSelecionado.remove();
}

buttonInput.addEventListener('click', geraLista);
buttonSalvarTarefas.addEventListener('click', salvaTarefas);
buttonRemoveFinalizados.addEventListener('click', removeFinalizados);
buttonExcluir.addEventListener('click', removeLista);
buttonMoverCima.addEventListener('click', moverCima);
buttonMoverBaixo.addEventListener('click', moverBaixo);
buttonRemoveSelecionado.addEventListener('click', removeSelecionado);

window.addEventListener('load', () => {
  if (localStorage.getItem('salvaTarefaNormal')) {
    geraListaSalva();
  }
});
