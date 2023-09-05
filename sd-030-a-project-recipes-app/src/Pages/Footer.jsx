import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcons from '../assets/drink.png';
import mealIcons from '../assets/icone-prato.png';

// import PropTypes from 'prop-types';

function Footer() {
  const history = useHistory();

  return (
    <footer className="footer bg-purple p-2" data-testid="footer">
      <div className="footer-icon-wrap">
        <button
          className="co"
          src={ mealIcon }
          data-testid="meals-bottom-btn"
          onClick={ () => history.push('/meals') }
        >
          <img src={ mealIcons } alt="meals-icon" />
        </button>
        <button
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          onClick={ () => history.push('/drinks') }
        >
          <img src={ drinkIcons } alt="drinks-icon" />
        </button>
      </div>
    </footer>
  );
}

// Footer.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }),
// }.isRequired;

export default Footer;
