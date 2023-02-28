const inputText = document.querySelector('#text-input');
const memeText = document.querySelector('#meme-text');
const imgFile = document.querySelector('#meme-insert');
const parentImage = document.querySelector('#meme-image');
const fire = document.querySelector('#fire');
const water = document.querySelector('#water');
const earth = document.querySelector('#earth');
const container = document.querySelector('#meme-image-container');
const altMemes = document.querySelector('#alt-memes');

function criaTextoMeme() {
  memeText.innerHTML = inputText.value;
}

function displayImage(event) {
  parentImage.src = URL.createObjectURL(event.target.files[0]);
}

imgFile.addEventListener('change', displayImage);
inputText.addEventListener('input', criaTextoMeme);

fire.addEventListener('click', () => {
  container.style.border = '3px dashed';
  container.style.borderColor = 'rgb(255, 0, 0)';
});
water.addEventListener('click', () => {
  container.style.border = '5px double';
  container.style.borderColor = 'rgb(0, 0, 255)';
});
earth.addEventListener('click', () => {
  container.style.border = '6px groove';
  container.style.borderColor = 'rgb(0, 128, 0)';
});

altMemes.addEventListener('click', (event) => {
  parentImage.src = event.target.src;
});

window.onload = () => {

};
