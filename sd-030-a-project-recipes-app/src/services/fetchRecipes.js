const BASE_URLS = {
  meals: {
    ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    firstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    category: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    filter: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
  },
  drinks: {
    ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
    name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    firstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
    category: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    filter: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
  } };

const fetchDataRecipes = async (type, option, input) => {
  try {
    const response = await fetch(`${BASE_URLS[type][option]}${input}`);
    const data = await response.json();
    return data[type];
  } catch (error) {
    return null;
  }
};

export default fetchDataRecipes;
