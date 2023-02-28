const productDetails = require('../src/productDetails');
/*
  A função productDetails recebe duas strings que representam nomes de produtos, e retorna um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara')

  // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  Escreva pelo menos cinco testes para essa função para garantir que a implementação de productDetails está correta.

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  let mock;
  beforeEach(() => {
    mock = productDetails('a', 'b')
  })
  it('Teste se productDetails é uma função.', () => {
    expect(typeof productDetails).toBe('function')
  })
  it('Teste se o retorno da função é um array.', () => {
    expect(typeof productDetails('a', 'b')).toBe('object')
  })
  it('Teste se o array retornado pela função contém dois itens dentro.', () => {
    expect(Object.keys(mock).length).toBe(2)
  })
  it('Teste se os dois itens dentro do array retornado pela função são objetos.', () => {
    mock.forEach((item) => {
      expect(typeof item).toBe('object')
    })
  })
  it('Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.', () => {
    expect(mock[0].name && mock[0].details).not.toEqual(mock[1].name && mock[1].details)
  })
  it('Teste se os dois productIds terminam com 123.', () => {
    expect(mock[0].details.productId && mock[1].details.productId).toMatch(/123$/)
  })
});
