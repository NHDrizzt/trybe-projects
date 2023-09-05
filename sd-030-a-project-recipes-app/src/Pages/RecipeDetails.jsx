import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import clipboardCopy from 'clipboard-copy';
import ReactPlayer from 'react-player';
import useFetch from '../hooks/useFetch';
import { fetchFoodDetails, fetchRecomendations } from '../utils/FoodDetailApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoriteRecipe, verifyIsFavorite } from '../helpers/functions';

function RecipeDetails() {
  const params = useParams();
  const [foodDetail, setFoodDetail] = useState([]);
  const [foodRecomandation, setFoodRecomendation] = useState([]);
  const { fetchData } = useFetch();
  const location = useLocation();
  const currentPath = location.pathname.includes('meals') ? 'meals' : 'drinks';
  const MAGIC = 6;
  const history = useHistory();
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isRecipeFavorite, setIsRecipeFavorite] = useState(false);

  const fetchFood = useCallback(async () => {
    await fetchData(() => fetchFoodDetails(currentPath, params), setFoodDetail);
    await fetchData(() => fetchRecomendations(currentPath), setFoodRecomendation);
  }, [currentPath, fetchData, params, setFoodDetail]);

  useEffect(() => {
    fetchFood();
  }, []);

  const isRecipeInProgress = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes && inProgressRecipes[currentPath]) {
      return inProgressRecipes[currentPath][params.id];
    }
    return false;
  };

  function handleShareButtonClick() {
    const recipeLink = window.location.href;
    clipboardCopy(recipeLink)
      .then(() => {
        setIsLinkCopied(true);
      })
      .catch((error) => {
        console.error('Failed to copy link:', error);
      });
  }
  useEffect(() => {
    setIsRecipeFavorite(verifyIsFavorite(params.id));
  }, [params.id]);

  const renderButton = () => {
    if (isRecipeInProgress()) {
      return (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
        >
          Continue Recipe
        </button>
      );
    }

    return (
      <button
        className="fixed bottom-0 bg-yellowClean mt-2 py-2 bg-yellowNew
            rounded-md text-white font-epilogue
            font-bold tracking-wide w-72 mx-auto translate-x-5 mb-2"
        data-testid="start-recipe-btn"
        onClick={ () => {
          if (currentPath === 'meals') {
            history.push(`/meals/${params.id}/in-progress`);
          } else if (currentPath === 'drinks') {
            history.push(`/drinks/${params.id}/in-progress`);
          }
        } }
      >
        Start Recipe
      </button>
    );
  };

  return (
    <div className="detail-main z-0">
      {
        foodDetail.map((food) => {
          const ingredientKeys = (Object.entries(food)
            .reduce((acc, curr) => {
              if (curr[0].includes('strIngredient') && curr[1]) acc.push(curr[1]);
              return acc;
            }, []));
          return (
            <div key={ food.idMeal || food.idDrink }>
              <img
                className="img-food absolute left-0 top-0 w-full h-[162px]"
                data-testid="recipe-photo"
                src={ food.strMealThumb }
                alt=""
              />
              {
                currentPath === 'meals'
                  ? (
                    <h2
                      className="text-white absolute font-epilogue
                      text-2xl italic font-bold top-0
                      uppercase
                       left-[140px] mt-[70px]"
                      data-testid="recipe-title"
                    >
                      {food.strMeal}
                    </h2>)
                  : (<h2 data-testid="recipe-title">{food.strDrink}</h2>)
              }
              <div>
                <div>
                  <h2 className="font-bold font-epilogue pt-3 pl-2">Ingredients</h2>
                </div>
                <div className="border-2 rounded-md">
                  <ul className="w-72 mx-auto mt-2 pl-0">
                    {
                      currentPath === 'meals'
                        ? (<li data-testid="recipe-category">{food.strCategory}</li>)
                        : (
                          <>
                            <li data-testid="recipe-category">{food.strCategory}</li>
                            <li data-testid="recipe-category">{food.strAlcoholic}</li>
                          </>
                        )
                    }

                    {ingredientKeys.map((key, i) => (
                      <li
                        className="pt-2"
                        key={ `${key + i}-${food.idDrink || food.idMeal}` }
                        data-testid={ `${i}-ingredient-name-and-measure` }
                      >
                        {key}
                        {food[`strMeasure${i + 1}`]}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>

              <div>
                <div>
                  <h2 className="font-bold font-epilogue pt-3 pl-2">Instructions</h2>
                </div>
                <div className="border-2 rounded-md p-3 text-justify">
                  <p data-testid="instructions">{food.strInstructions}</p>
                </div>
              </div>

              {currentPath === 'meals' ? (
                <div
                  className="my-4 flex flex-col"
                  data-testid="video"
                >
                  <div>
                    <h2 className="font-bold font-epilogue pt-3 pl-2">Video</h2>
                  </div>
                  <div>
                    <ReactPlayer
                      url={ food.strYoutube }
                      width="w-[280px]"
                    />
                  </div>

                </div>

              ) : null}
            </div>
          );
        })
      }
      <div className="flex absolute z-2 top-0 right-0 mt-3 mr-2">
        <button
          className="share-btn flex flex-col items-center justify-center mr-3"
          data-testid="share-btn"
          onClick={ handleShareButtonClick }
        >
          <img src={ shareIcon } alt="Share" />
          <p className="hidden">Compartilhar</p>
        </button>
        {isLinkCopied && <p data-testid="link-copied-message">Link copied!</p>}
        <button
          className="favorite-btn flex flex-col items-center justify-center mr-3"
          data-testid="favorite-btn"
          onClick={ () => {
            favoriteRecipe(foodDetail[0], currentPath);
            setIsRecipeFavorite(verifyIsFavorite(params.id));
          } }
          src={ isRecipeFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ isRecipeFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite"
          />
          <p className="hidden">Favoritar</p>
        </button>
      </div>

      <div className="carossel-animado flex flex-col ">
        <div>
          <h2 className="font-bold font-epilogue pt-3 pl-2">Recommended</h2>
        </div>
        <div>
          <Carousel interval={ null } slide={ false }>
            {foodRecomandation.slice(0, MAGIC).map((food, i) => (
              <Carousel.Item
                key={ food.idMeal || food.idDrink }
                data-testid={ `${i}-recommendation-card` }
              >
                <div className="yep-slide border-2 rounded-md text-left">
                  <img
                    src={ `${(food.strMealThumb || food.strDrinkThumb)}/preview` }
                    alt=""
                  />
                  <h2 data-testid={ `${i}-recommendation-title` }>
                    { food.strMeal || food.strDrink }
                  </h2>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
      {renderButton()}

    </div>
  );
}

export default RecipeDetails;
