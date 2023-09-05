import { mealAllData, mealData } from './mealData';
import { drinkAllData } from './drinkData';
import { drinkData } from './drinkDatas';

export const mockFetch = (url) => {
  if (url === ('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977')) {
    return Promise.resolve({
      json: () => Promise.resolve(mealData),
    });
  }

  if (url === ('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997')) {
    return Promise.resolve({
      json: () => Promise.resolve(drinkData),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(drinkAllData),
    });
  }

  if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=') {
    return Promise.resolve({
      json: () => Promise.resolve(mealAllData),
    });
  }

  return Promise.reject(new Error('erro'));
};
