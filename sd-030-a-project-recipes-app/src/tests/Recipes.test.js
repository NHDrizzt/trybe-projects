import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import fetchDataRecipes from '../services/fetchRecipes';

// Finalizado!

describe('Teste do componenete Recipes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Se a requisição a API meals é realizada', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(meals)
          .mockResolvedValueOnce(mealCategories),
      });
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const corbaRecipe = await screen.findByText(/corba/i);
    expect(corbaRecipe).toBeInTheDocument();
  });

  test('Testa se a requisição a API drinks é realizada', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValueOnce(drinks)
          .mockResolvedValueOnce(drinkCategories),
      });
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const drinkRecipe = await screen.findByText(/a1/i);
    expect(drinkRecipe).toBeInTheDocument();
  });

  test('Testa o comportamente da função fetch quando o resultado é igual a null', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error(''));

    const result = await fetchDataRecipes('meals', 'name', 'chicken');

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');

    expect(result).toBeNull();
  });
});
