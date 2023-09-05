import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import context from './appContext';

const HEADER_PROPERTIES = {
  hasHeader: false,
  hasSearchIcon: true,
  showSearchInput: false,
  title: '',
};

// const SEARCH_RESULTS_PROPERTIES = {
//   search: [],
// };

function AppProvider({ children }) {
  const [headerProperties, setHeaderProperties] = useState({ ...HEADER_PROPERTIES });
  const [searchResults, setSearchResults] = useState(null);
  const [foodDetail, setFoodDetail] = useState([]);

  const value = useMemo(() => ({
    headerProperties,
    searchResults,
    foodDetail,
    setFoodDetail,
    setHeaderProperties,
    setSearchResults,
  }), [headerProperties, searchResults, foodDetail]);

  return (
    <context.Provider
      value={ value }
    >
      {children}
    </context.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
