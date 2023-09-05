import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { removeFavoriteRecipe } from '../helpers/functions';

import blackHeartIcon from '../images/blackHeartIcon.svg';

import ALL_FOODS_ICON from '../assets/Pages/DoneRecipes/yellow-all-foods-icon.svg';
import DRINKS_ICON from '../assets/Pages/DoneRecipes/yellow-drink-icon.svg';
import MEALS_ICON from '../assets/Pages/DoneRecipes/yellow-meals-icon.svg';
import SHARE_ICON from '../assets/Pages/DoneRecipes/yellow-share-icon.svg';

function CardRecipe({ doneRecipes, favoriteRecipes }) {
  const recipesList = doneRecipes || favoriteRecipes;
  const [filter, setFilter] = useState([...recipesList]);
  const [clipboard, setClipboard] = useState('');

  const history = useHistory();

  const handleClick = (type, id) => {
    const url = window.location.origin;
    const recipeLink = `${url}/${type}s/${id}`;
    setClipboard(recipeLink);
    navigator.clipboard.writeText(recipeLink);
  };

  const handleFilter = ({ target: { name } }) => {
    if (name === 'meals') {
      setFilter(recipesList.filter((el) => el.type === 'meal'));
    } else if (name === 'drinks') {
      setFilter(recipesList.filter((el) => el.type === 'drink'));
    } else {
      setFilter(recipesList);
    }
  };

  return (
    <div>
      <button
        onClick={ handleFilter }
        data-testid="filter-by-all-btn"
        className="
        postion: absolute w-[66.72px] h-[86.43px] left-[50px] top-[184.28px]"
      >
        <img src={ ALL_FOODS_ICON } alt="All foods icon" />
      </button>

      <button
        name="meals"
        onClick={ handleFilter }
        data-testid="filter-by-meal-btn"
        className="
        postion: absolute w-[66.72px] h-[85.72px] left-[146.28px] top-[184.28px]
        "
      >
        <img src={ MEALS_ICON } alt="Meals icon" />
      </button>
      <button
        name="drinks"
        onClick={ handleFilter }
        data-testid="filter-by-drink-btn"
        className="
        postion: absolute w-[66.72px] h-[83.72px] left-[243px] top-[184.28px]
        "
      >
        <img src={ DRINKS_ICON } alt="Drinks icon" />
      </button>

      <div
        className="
        postion: absolute w-[318px] h-[435px] left-[19px] top-[298px]
        border-[0.52px] border-[#B1B1B1]
        "
      >
        {
          filter.map((recipe, index) => {
            const url = window.location.origin;
            const recipeLink = `${url}/${recipe.type}s/${recipe.id}`;

            return (
              <div
                key={ index }
                className="
                postion: absolute w-[318px] h-[135px] left-[19px] top-[298px]
                border-[0.52px] border-[#B1B1B1]
                "
              >
                <button
                  className="card-recipe-button"
                  onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt=""
                    className="img-food
                    postion: absolute w-[163.35px] h-[134.85px] left-[19px] top-[298px]
                    rounded-l-lg
                    "
                  />
                </button>

                <p
                  data-testid={ `${index}-horizontal-top-text` }
                  className="
                  postion: absolute w-[70px] h-[9px] left-[203px] top-[333px]
                  font-['Epilogue'] normal font-[300] text-[9px] leading-[9px]
                  text-center text-[#797D86]
                  "
                >
                  {recipe.nationality && `${recipe.nationality} -`}
                  {` ${recipe.category} `}
                  {recipe.alcoholicOrNot && `- ${recipe.alcoholicOrNot}`}
                </p>
                <button
                  className="card-recipe-button
                  postion: absolute w-[86px] h-[12px] left-[203px] top-[317px]
                  font-['Epilogue'] normal font-[700] text-[12px] leading-[12px]
                  text-[#1A1B1C]
                  "
                  data-testid={ `${index}-horizontal-name` }
                  onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
                >
                  {recipe.name}
                </button>

                <p
                  data-testid={ `${index}-horizontal-done-date` }
                  className="
                  postion: absolute w-[84px] h-[9px] left-[202px] top-[365px]
                  font-['Epilogue'] normal font-[400] text-[9px] leading-[9px]
                  text-center text-[#1A1B1C]
                  "
                >
                  {recipe.doneDate}

                </p>
                {
                  !!(doneRecipes && recipe.tags.length) && recipe.tags
                    .slice(0, 2).map((el, i) => (
                      <div
                        key={ i }
                        className="
                        position: absolute w-[29px] h-[14px] left-[203px] top-[406px]
                        "
                      >
                        <p
                          // key={ i }
                          data-testid={ `${index}-${el}-horizontal-tag` }
                          className="
                          postion: absolute w-[17px] h-[9px] left-[208px] top-[409px]
                          font-['Epilogue'] normal font-[400] text-[9px] leading-[9px]
                          flex items-center text-[#797D86]
                          "
                        >
                          {el}
                        </p>
                      </div>
                    ))
                }
                <div
                  className="
                  postion: absolute w-[20px] h-[20px] left-[300px] top-[313px]
                  "
                >
                  <button
                    src={ SHARE_ICON }
                    data-testid={ `${index}-horizontal-share-btn` }
                    onClick={ () => { handleClick(recipe.type, recipe.id); } }
                    className="
                    postion: absolute
                    font-['Epilogue'] normal font-[400] text-[9px] leading-[9px]
                    flex items-centertext-[#797D86]
                    "
                  >
                    <img
                      src={ SHARE_ICON }
                      alt=""
                      className="
                      postion: absolute
                      left-[83.33%] right-[11.11%] top-[39.12%] bottom-[58.38%]
                      "
                    />
                    { clipboard === recipeLink ? 'Link copied!' : 'Share' }
                  </button>
                </div>

                {
                  favoriteRecipes && (
                    <button
                      style={ { all: 'unset' } }
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      onClick={ () => {
                        console.log(recipe);
                        removeFavoriteRecipe(recipe.id);
                        window.location.reload(false);
                      } }
                      className="
                      postion: absolute w-[22.89px] h-[20.3px] left-[238px] top-[394px]
                      "
                    >
                      <img
                        src={ blackHeartIcon }
                        // src={ isRecipeFavorite ? blackHeartIcon : whiteHeartIcon }
                        alt="favorite-icone"
                        className="
                        postion: absolute
                        left-[66.11%] right-[27.53%] top-[49.25%] bottom-[48.21%]
                        "
                      />
                    </button>
                  )
                }
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

CardRecipe.propTypes = {
  doneRecipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  favoriteRecipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default CardRecipe;
