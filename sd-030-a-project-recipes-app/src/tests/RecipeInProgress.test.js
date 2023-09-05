import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';

import { mealData } from './utilsTest/mealData';

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe('', () => {
  test('', async () => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mealData),
      });
    const { history } = renderWithRouterAndContext(<App />, '/meals/52977/in-progress');

    expect(await screen.findByRole('heading', { name: /corba/i }));

    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton.textContent).toBe('Share');

    userEvent.click(shareButton);
    navigator.clipboard.writeText.mockResolvedValue('http://localhost:3000/meals/52977');
    expect(shareButton.textContent).toBe('Link copied!');

    const favoriteButton = await screen.findByRole('img', { name: /favorite-icone/i });

    expect(favoriteButton.src).toBe('http://localhost/whiteHeartIcon.svg');
    userEvent.click(favoriteButton);

    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
    ]));

    expect(favoriteButton.src).toBe('http://localhost/blackHeartIcon.svg');
    userEvent.click(favoriteButton);

    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteStorage).toEqual([]);
    expect(await screen.findByRole('img', { name: /alt/i }));

    const checkBoxIngredient = await screen.findByRole('checkbox', { name: /lentils/i });
    userEvent.click(checkBoxIngredient);
    expect(checkBoxIngredient).toBeChecked();

    userEvent.click(checkBoxIngredient);
    expect(checkBoxIngredient).not.toBeChecked();

    const checkBoxIngredients = (Object.entries(mealData.meals[0])
      .reduce((acc, curr) => {
        if (curr[0].includes('strIngredient') && curr[1]) acc.push(curr[1]);
        return acc;
      }, []));

    expect(await screen.findByTestId('finish-recipe-btn')).toBeDisabled();

    checkBoxIngredients.forEach((e, index) => {
      const checkBox = screen.getByTestId(`${e}-ingredient-checkbox`);
      const labelStyle = screen.getByTestId(`${index}-ingredient-step`);
      userEvent.click(checkBox);
      expect(checkBox).toBeChecked();
      expect(labelStyle.style.textDecoration).toBe('line-through solid rgb(0, 0, 0)');
    });

    window.location.reload();

    checkBoxIngredients.forEach((e) => {
      const checkBox = screen.getByTestId(`${e}-ingredient-checkbox`);
      expect(checkBox).toBeChecked();
    });

    const finishButton = await screen.findByTestId('finish-recipe-btn');
    expect(finishButton).toBeEnabled();

    userEvent.click(finishButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
