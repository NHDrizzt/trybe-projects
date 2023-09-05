import React from 'react';
import { getNodeText, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import AppProvider from '../context/AppProvider';
import App from '../App';
import { mockFetch } from './utilsTest/mockFetch';

const RECIPE_TITLE = 'recipe-title';
const HISTORY_PUSH = '/meals/52977';
const RECIPE_CATEGORY = 'recipe-category';

describe('', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));

  afterEach(() => { jest.resetAllMocks(); });

  it('should call 2 api 2 times', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(HISTORY_PUSH);
    });
    expect(global.fetch).toHaveBeenCalled();
    await screen.findByTestId(RECIPE_TITLE);
  });

  it('should have all elements needed when recipedetails meals is called', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push(HISTORY_PUSH);
    });
    await waitFor(() => {
      expect(screen.getByTestId(RECIPE_TITLE).textContent).toBe('Corba');
      expect(screen.getByTestId('recipe-photo').src).toBe('https://www.themealdb.com//images/media/meals/58oia61564916529.jpg');
      expect(screen.getByTestId(RECIPE_CATEGORY).textContent).toBe('Side');
      expect(screen.getAllByTestId(/ingredient-name-and-measure/i)).toHaveLength(20);
      expect(screen.getByTestId('video')).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should have all elements needed when recipedetails drinks is called', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );
    act(() => {
      history.push('/drinks/15997');
    });
    await waitFor(() => {
      expect(screen.getByTestId(RECIPE_TITLE).textContent).toBe('GG');
      expect(screen.getByTestId('recipe-photo').src).toBe('');
      const p = screen.getAllByTestId(RECIPE_CATEGORY);
      const texts = p.map(getNodeText);
      expect(texts).toEqual(['Ordinary Drink', 'Optional alcohol']);
      expect(screen.getAllByTestId(/ingredient-name-and-measure/i)).toHaveLength(15);
    });
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
  it('should display the share button and copy the recipe link when clicked', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    // Simulate navigation to the recipe details page
    await act(async () => {
      history.push(HISTORY_PUSH);
    });

    // Click the share button
    const shareButton = screen.getByTestId('share-btn');
    shareButton.click();

    // Verify that the link copied message is displayed
    const linkCopiedMessage = await screen.findByTestId('link-copied-message');
    expect(linkCopiedMessage).toBeInTheDocument();
  });

  it('should add recipe to favorites when favorite button is clicked', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    // Simulate navigation to the recipe details page
    await act(async () => {
      history.push('/meals/52977');
    });

    // Click the favorite button
    const favoriteButton = screen.getByTestId('favorite-btn');
    favoriteButton.click();

    // Verify that the recipe is added to favorites
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual(expect.arrayContaining(['52977']));

    // Click the favorite button again to remove from favorites
    favoriteButton.click();

    // Verify that the recipe is removed from favorites
    const updatedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(updatedFavoriteRecipes).toEqual([]);
  });

  it('should display error message when API request fails', async () => {
    jest.spyOn(global.fetch).mockImplementation(() => Promise.reject(new Error('API request failed')));

    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    // Simulate navigation to the recipe details page
    await act(async () => {
      history.push(HISTORY_PUSH);
    });

    // Verify that the error message is displayed
    const errorMessage = await screen.findByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should navigate to the in-progress recipe page when Start Recipe button is clicked', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    // Simulate navigation to the recipe details page
    act(() => {
      history.push(HISTORY_PUSH);
    });
    // Click the Start Recipe button
    const startRecipeButton = screen.getByTestId('start-recipe-btn');
    fireEvent.click(startRecipeButton);

    // Verify that the correct URL is navigated to
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
});
