export function favoriteRecipe(recipe, pathname) {
  const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const newRecipe = {
    id: recipe.idDrink || recipe.idMeal,
    type: pathname === 'drinks' ? 'drink' : 'meal',
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink || '',
    image: recipe.strMealThumb || recipe.strDrinkThumb,
  };

  if (favoriteStorage.length) {
    const index = favoriteStorage
      .findIndex(({ id }) => id === (recipe.idDrink || recipe.idMeal));
    if (index >= 0) {
      favoriteStorage.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteStorage]));
      return;
    }
  }
  favoriteStorage.push({ ...newRecipe });
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteStorage]));
}

export function removeFavoriteRecipe(idRecipe) {
  const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const index = favoritesStorage.findIndex(({ id }) => id === idRecipe);
  favoritesStorage.splice(index, 1);
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favoritesStorage]));
}

export function verifyIsFavorite(idRecipe) {
  const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  if (favoriteStorage.length) {
    const hasFavorite = favoriteStorage.some(({ id }) => id === idRecipe);
    return hasFavorite;
  }
  return false;
}

export function createRecipeObject(recipe, pathname) {
  console.log(recipe);
  return {
    id: recipe.idMeal || recipe.idDrink,
    nationality: recipe.strArea || '',
    name: recipe.strMeal || recipe.strDrink || '',
    category: recipe.strCategory || '',
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
    alcoholicOrNot: recipe.strAlcoholic || '',
    type: pathname === 'drinks' ? 'drink' : 'meal',
  };
}
