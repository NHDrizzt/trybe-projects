// Ponto 11

const validateRepeatedNumbers = (object, iterator) => {
    let counter = 0;
    for (const iterator2 of object) {
      if (iterator === iterator2) {
        counter += 1;
      }
    }
    if (counter >= 3) {
      return false;
    } else {
      return true;
    }
  };
  
  const validateObjectNumbers = (object) => {
    let ans = true;
    for (const iterator of object) {
      if (iterator < 0 || iterator > 9) {
        return false;
      } else {
        ans = validateRepeatedNumbers(object, iterator);
        if (ans == false) {
          return false;
        }
      }
    }
    return ans;
  };
  
  const validateObjectIntegrity = (object) => {
    for (const iterator of object) {
      if (typeof iterator !== "number") {
        return false;
      }
    }
    return true;
  };
  
  const generatePhoneNumber = (object) => {
    let checkNumbers = validateObjectNumbers(object);
    let checkInvalids = validateObjectIntegrity(object);
    let ans = object.join("");
    if (object.length !== 11) {
      return "Array com tamanho incorreto";
    }
    if (checkInvalids && checkNumbers) {
      return `(${ans.substring(0, 2)}) ${ans.substring(2, 7)}-${ans.substring(
        7,
        ans.length
      )}`;
    } else {
      return "não é possível gerar um número de telefone com esses valores";
    }
  };
  
  // Ponto 12
  //a primeira condicao de lineA < lineB+linceC && Math.abs(lineB-lineC) nao faz sentido, pq sempre vai dar true na segunda depois de verificar a primeira condicao ja que e um operador de OU
  //say i wont
  const triangleCheck = (lineA, lineB, lineC) => {
    return lineA < lineB + lineC || lineB < lineA + lineC || lineC < lineA + lineB
      ? true
      : false;
  };
  
  // Ponto 13
  const hydrate = (params) => {
    let nums = 0;
    for (const iterator of params) {
      let check = Number(iterator);
      if (check > 0) {
        nums += Number(iterator);
      }
    }
    if (nums === 1) {
      return "1 copo de água";
    } else if (nums === 0) {
      return "0 copo de água";
    } else {
      return `${nums} copos de água`;
    }
  };