import { useContext, useEffect } from 'react';

import CardRecipe from '../Components/CardRecipe';
import context from '../context/appContext';
// import PropTypes from 'prop-types';

function DoneRecipes() {
  const { headerProperties, setHeaderProperties } = useContext(context);
  const { title } = headerProperties;

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'))
  || [];

  useEffect(() => {
    if (title !== 'Done Recipes') {
      setHeaderProperties({
        ...headerProperties,
        title: 'Done Recipes',
        hasSearchIcon: false,
        hasHeader: true,
      });
    }
  });

  return (
    <div
      className="
      postion: relative
      w-[360px] h-[800px]
      bg-[#FFFFFF]
      "
    >
      <CardRecipe doneRecipes={ doneRecipes } />
    </div>
  );
}

// DoneRecipes.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }),
// }.isRequired;

export default DoneRecipes;
