import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// teste

function FoodCard(props) {
  // extrair props
  const { index, result } = props;
  const history = useHistory();
  const { pathname } = history.location;

  const handleClick = () => {
    const URL = `${pathname}/${result.idMeal || result.idDrink}`;
    history.push(URL);
  };

  return (
    <button
      className="icon-lixo border rounded-md text-left"
      onClick={ handleClick }
      data-testid={ `${index}-recipe-card` }
      key={ index }
    >
      <img
        className="w-40 rounded-md ml-0"
        alt={ result.strMeal || result.strDrink }
        src={ result.strMealThumb || result.strDrinkThumb }
        data-testid={ `${index}-card-img` }
      />

      <p
        className="pl-3"
        data-testid={ `${index}-card-name` }
      >
        {result.strMeal || result.strDrink}
      </p>
    </button>
  );
}

FoodCard.propTypes = {
  index: PropTypes.number,
  result: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isRequired;

export default FoodCard;
