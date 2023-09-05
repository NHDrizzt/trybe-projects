import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';

import App from '../App';

describe('Testa componente FoodCard', () => {
  test('Testa se ao clicar no meal recipe é redirecionado para a pagina RecipeDetails', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(meals),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mealCategories),
      });
    const { history } = renderWithRouterAndContext(<App />, '/meals');

    const foodRecipeButton = await screen.findByRole('button', { name: /corba corba/i });
    await waitFor(() => {
      userEvent.click(foodRecipeButton);
      expect(history.location.pathname).toBe('/meals/52977');
    }, { timeout: 2000 });
  });

  test('Testa se ao clicar no dink recipe é redirecionado para a pagina RecipeDetails', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(drinks),
      }).mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinkCategories),
      });
    const { history } = renderWithRouterAndContext(<App />, '/drinks');

    const foodRecipeButton = await screen.findByRole('button', { name: /gg gg/i });
    await waitFor(() => {
      userEvent.click(foodRecipeButton);
      expect(history.location.pathname).toBe('/drinks/15997');
    }, { timeout: 2000 });
  });
});
