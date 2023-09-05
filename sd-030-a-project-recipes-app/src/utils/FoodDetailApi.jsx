export const fetchFoodDetails = async (currentPath, params) => {
  const URL = currentPath === 'meals'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
  const response = await fetch(URL);
  const result = await response.json();
  return 'meals' in result ? result.meals : result.drinks;
};

export const fetchRecomendations = async (currentPath) => {
  const URL = currentPath === 'meals'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const result = await response.json();
  return 'meals' in result ? result.meals : result.drinks;
};
