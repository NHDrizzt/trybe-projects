const submitButton = document.querySelector('.submit-login');
const submitFormsButton = document.querySelector('#submit-btn');
const agreement = document.querySelector('#agreement');
const valorDoTextarea = document.querySelector('#textarea');
let materiaisArray = [];

function validarEmailSenha() {
  const inputEmail = document.querySelector('#email').value;
  const inputPassword = document.querySelector('#password').value;
  if (inputEmail === 'tryber@teste.com' && inputPassword === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

function validateSubmitButton() {
  submitFormsButton.disabled = !agreement.checked;
}

function validateTextarea(event) {
  let totalFixo = 500;
  const totalDigitado = event.target.value.length;
  if (totalDigitado <= totalFixo) {
    totalFixo -= totalDigitado;
    document.querySelector('#counter').innerHTML = totalFixo.toString();
  }
}

function criaElementosNecessarios(objetoLista1, objetoLista2) {
  const createSecondForm = document.createElement('form');
  createSecondForm.id = 'form-data';
  const asideNode = document.querySelector('aside');
  asideNode.parentNode.insertBefore(createSecondForm, asideNode);
  createSecondForm.innerHTML = `<p>Nome: ${objetoLista1.name} ${objetoLista1.last}</p>
  <p>Email: ${objetoLista1.emails}</p>
  <p>Casa: ${objetoLista1.cas}<p>
  <p>Família: ${objetoLista2.fam}</p>
  <p>Matérias: ${objetoLista2.mat.join(', ')}</p>
  <p>Avaliação: ${objetoLista2.ava}</p>
  <p>Observações: ${objetoLista2.obs}</p>`;
}

function criaObjeto(nome, lastName, email, casa) {
  return {
    name: nome,
    last: lastName,
    emails: email,
    cas: casa,
  };
}

function criaObjeto2(familia, materiais, avaliacao, observacao) {
  return {
    fam: familia,
    mat: materiaisArray,
    ava: avaliacao,
    obs: observacao,
  };
}

function removeBody() {
  const nome = document.querySelector('#input-name').value;
  const lastName = document.querySelector('#input-lastname').value;
  const email = document.querySelector('#input-email').value;
  const casa = document.querySelector('#house').value;
  const familia = document.querySelector('input[name="family"]:checked').value;
  const materiais = document.querySelectorAll('input[name="subject"]:checked');
  const avaliacao = document.querySelector('input[name="rate"]:checked').value;
  const observacao = document.querySelector('#textarea').value;
  materiaisArray = Array.from(materiais).map((x) => x.value);
  const myObject1 = criaObjeto(nome, lastName, email, casa);
  const myObject2 = criaObjeto2(familia, materiais, avaliacao, observacao);
  document.querySelector('#evaluation-form').innerHTML = '';
  document.querySelector('#evaluation-form').style.display = 'none';
  criaElementosNecessarios(myObject1, myObject2);
}

submitFormsButton.addEventListener('click', removeBody);
valorDoTextarea.addEventListener('keyup', validateTextarea);
agreement.addEventListener('change', validateSubmitButton);
submitButton.addEventListener('click', validarEmailSenha);
