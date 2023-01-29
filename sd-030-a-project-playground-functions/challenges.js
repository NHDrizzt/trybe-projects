// Ponto1
const compareTrue = (valor1, valor2) =>
  valor1 === true && valor2 === true ? true : false;

// Ponto 2
const splitSentence = (frase) => frase.split(" ");

// Ponto 3
const concatName = (object) => {
  let arr = [];
  arr.push(object[0]);
  arr.unshift(object.pop());
  console.log(arr.join(", "));
};

// Ponto 4
const footballPoints = (wins, ties) =>
  wins != NaN && wins >= 0 && ties != NaN && ties >= 0
    ? wins * 3 + ties
    : "ERROR";

// Ponto 5
const findHighestNumber = (object) => {
  let maxValue = 0;
  for (const iterator of object) {
    if (iterator > maxValue) {
      maxValue = iterator;
    }
  }
  return maxValue;
};
const highestCount = (object) => {
  let highestNumber = findHighestNumber(object);
  let count = 0;
  for (const iterator of object) {
    if (iterator == highestNumber) {
      count += 1;
    }
  }
  return count;
};

// Ponto 6
const calcTriangleArea = (base, altura) => (base * altura) / 2;
const calcRectangleArea = (base, altura) => base * altura;
const calcAllAreas = (base, altura, form) => {
  switch (form) {
    case "triângulo":
      return `O valor da área do triângulo é de: ${calcTriangleArea(
        base,
        altura
      )}`;
    case "retângulo":
      return `O valor da área do retângulo é de: ${calcRectangleArea(
        base,
        altura
      )}`;
    default:
      return "Não foi possível fazer o cálculo, insira uma forma geométrica válida.";
  }
};

// Ponto 7
const catAndMouse = (mouse, cat1, cat2) => {
  let ans = "";
  let distanciaEmUnidadesCat1 = Math.abs(mouse - cat1);
  let distanciaEmUnidadesCat2 = Math.abs(mouse - cat2);
  if (distanciaEmUnidadesCat1 < distanciaEmUnidadesCat2) {
    ans = "cat1";
  } else if (distanciaEmUnidadesCat2 < distanciaEmUnidadesCat1) {
    ans = "cat2";
  } else {
    ans = "os gatos trombam e o rato foge";
  }

  return ans;
};

// Ponto 8
const fizzBuzz = (object) => {
  let ans = [];
  for (const iterator of object) {
    if (iterator % 3 == 0 && iterator % 5 == 0) {
      ans.push("fizzBuzz");
    } else if (iterator % 3 == 0) {
      ans.push("fizz");
    } else if (iterator % 5 == 0) {
      ans.push("buzz");
    } else {
      ans.push("bug");
    }
  }
  return ans;
};

// Ponto 9
const encode = (word) => {
  let encoded = "";
  let any;
  for (const iterator of word) {
    if (iterator == "a") {
      any = 1;
    } else if (iterator == "e") {
      any = 2;
    } else if (iterator == "i") {
      any = 3;
    } else if (iterator == "o") {
      any = 4;
    } else if (iterator == "u") {
      any = 5;
    } else {
      any = iterator;
    }
    encoded = encoded.concat(any);
  }
  return encoded;
};

const decode = (word) => {
  let decoded = "";
  let any;
  for (const iterator of word) {
    if (iterator == "1") {
      any = "a";
    } else if (iterator == "2") {
      any = "e";
    } else if (iterator == "3") {
      any = "i";
    } else if (iterator == "4") {
      any = "o";
    } else if (iterator == "5") {
      any = "u";
    } else {
      any = iterator;
    }
    decoded = decoded.concat(any);
  }
  return decoded;
};

const mainProgram = (word) => {
  if (typeof word !== "string") {
    return "ERROR";
  }
  word = word.toLowerCase();
  let encoded = encode(word);
  console.log(encoded);
  let decoded = decode(encoded);
  return decoded;
};

// Ponto 10

const techList = (object, nome) => {
  const arrayObjects = [];
  if (object.length === 0) {
    return object;
  }
  for (const objectElement of object) {
    arrayObjects.push({
      tech: objectElement,
      name: nome,
    });
  }
  return arrayObjects;
};
