import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Footer from './Pages/Footer';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Recipes from './Pages/Recipes';
import RecipeDetails from './Pages/RecipeDetails';
import RecipeInProgress from './Pages/RecipeInProgress';

function App() {
  const location = useLocation();
  const showFooter = !(
    location.pathname === '/'
    || location.pathname.startsWith('/meals/')
    || location.pathname.startsWith('/drinks/')
    || location.pathname === '/done-recipes'
    || location.pathname === '/favorite-recipes'
  );

  const showHeader = !(
    location.pathname === '/'
      || location.pathname.startsWith('/meals/')
      || location.pathname.startsWith('/drinks/')
      || location.pathname === '/done-recipes'
      || location.pathname === '/favorite-recipes'
  );

  // const { headerProperties: { hasHeader } } = useContext(context);

  return (
    <div>
      { showHeader && <Header />}
      <div className="meals">
        {/* <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object> */}
        <Switch>
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route
            path="/meals/:idreceita/in-progress"
            component={ RecipeInProgress }
          />
          <Route
            path="/drinks/:idreceita/in-progress"
            component={ RecipeInProgress }
          />
        </Switch>
        {showFooter && <Footer /> }
      </div>
    </div>
  );
}

export default App;
