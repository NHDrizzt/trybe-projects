import { useCallback, useEffect, useState } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';

import {
  createRecipeObject,
  favoriteRecipe,
  verifyIsFavorite,
} from '../helpers/functions';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);
  const [ingredientsDone, setIngredientsDone] = useState([]);
  const [foodDetail, setFoodDetail] = useState(null);
  const [clipboard, setClipboard] = useState('');
  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  console.log(foodDetail);

  const recipe = { ...foodDetail };
  const {
    idDrink,
    idMeal,
    strCategory,
    strInstructions,
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
  } = recipe;

  const pathname = location.pathname.includes('meals') ? 'meals' : 'drinks';

  const url = window.location.origin;
  const recipeLink = `${url}/${pathname}/${idDrink || idMeal}`;
  const recipeNameAndId = idMeal ? `idMeal_${idMeal}` : `idDrink_${idDrink}`;
  const inProgressRecipes = JSON.parse(localStorage
    .getItem('inProgressRecipes'));

  const fetchFood = useCallback(async () => {
    const URL = pathname === 'meals'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.idreceita}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.idreceita}`;
    const response = await fetch(URL);
    const data = await response.json();

    const results = data.drinks || data.meals;
    setFoodDetail({ ...results[0] });
  }, [pathname, params.idreceita, setFoodDetail]);

  const getStorageItems = useCallback(() => {
    if (inProgressRecipes && inProgressRecipes[recipeNameAndId]) {
      setIngredientsDone([...inProgressRecipes[recipeNameAndId]]);
    }
    setIsRecipeFavorite(verifyIsFavorite(idDrink || idMeal));
  }, [idDrink, idMeal, inProgressRecipes, recipeNameAndId]);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  useEffect(() => {
    getStorageItems();
  }, [foodDetail]);

  function saveStorageProgress(progress) {
    const inProgressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressStorage,
      [recipeNameAndId]: [...progress],
    }));
  }

  const ingredients = (Object.entries(recipe)
    .reduce((acc, curr) => {
      if (curr[0].includes('strIngredient') && curr[1]) acc.push(curr[1]);
      return acc;
    }, []));

  const handleInputChange = ({ target: { value } }) => {
    const ingredientsProgress = [];

    const index = ingredientsDone
      .findIndex((ingredient) => ingredient === value);

    if (index < 0) {
      ingredientsProgress.push(...ingredientsDone, value);
      setIngredientsDone([...ingredientsProgress]);
    } else {
      ingredientsDone.splice(index, 1);
      ingredientsProgress.push(...ingredientsDone);
      setIngredientsDone([...ingredientsProgress]);
    }

    saveStorageProgress(ingredientsProgress);
  };

  function copyToClipboard() {
    setClipboard(recipeLink);
    navigator.clipboard.writeText(recipeLink);
  }

  function finishRecipe() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON.stringify(
      [
        ...doneRecipes,
        {
          ...createRecipeObject(recipe, pathname),
          doneDate: new Date(),
        },
      ],
    ));
    history.push('/done-recipes');
  }

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt="alt"
        style={ { width: '200px' } }
      />

      <h3 data-testid="recipe-title">{strMeal || strDrink}</h3>

      <button
        data-testid="share-btn"
        onClick={ copyToClipboard }
      >
        {clipboard === recipeLink ? 'Link copied!' : 'Share'}
      </button>

      <button
        style={ { all: 'unset' } }
        data-testid="favorite-btn"
        src={ isRecipeFavorite ? blackHeartIcon : whiteHeartIcon }
        onClick={ () => {
          favoriteRecipe(recipe, pathname);
          setIsRecipeFavorite(verifyIsFavorite(idDrink || idMeal));
        } }
      >
        <img
          src={ isRecipeFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite-icone"
        />
      </button>

      <h3 data-testid="recipe-category">{strCategory}</h3>

      {
        ingredients.map((ingredient, index) => (
          <div key={ `${ingredient}-${index}` }>
            <label
              htmlFor={ index }
              data-testid={ `${index}-ingredient-step` }
              style={ {
                textDecoration: ingredientsDone.includes(ingredient)
                  ? 'line-through solid rgb(0, 0, 0)' : 'none',
              } }
            >
              <input
                data-testid={ `${ingredient}-ingredient-checkbox` }
                value={ ingredient }
                id={ index }
                type="checkbox"
                checked={ ingredientsDone.includes(ingredient) }
                onChange={ handleInputChange }
              />
              {ingredient}
            </label>
          </div>
        ))
      }

      <p data-testid="instructions">{strInstructions}</p>

      <button
        data-testid="finish-recipe-btn"
        disabled={ ingredientsDone.length !== ingredients.length }
        onClick={ finishRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
