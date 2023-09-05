import { useContext, useEffect, useState } from 'react';

import context from '../context/appContext';
import CardRecipe from '../Components/CardRecipe';

function FavoriteRecipes() {
  const { headerProperties, setHeaderProperties } = useContext(context);
  const { title } = headerProperties;
  const [favoritesList, setFavoritesList] = useState(null);

  function getFavorites() {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) return JSON.parse(favoriteRecipes);
    return [];
  }

  useEffect(() => {
    setFavoritesList([...getFavorites()]);
  }, []);

  useEffect(() => {
    if (title !== 'Favorite Recipes') {
      setHeaderProperties({
        ...headerProperties,
        title: 'Favorite Recipes',
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
      {favoritesList && <CardRecipe favoriteRecipes={ favoritesList } />}
    </div>
  );
}

// FavoriteRecipes.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }),
// }.isRequired;

export default FavoriteRecipes;
