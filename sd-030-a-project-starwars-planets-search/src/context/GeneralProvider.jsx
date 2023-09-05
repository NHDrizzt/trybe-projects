import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GeneralContext } from './GeneralContext';
import useFetch from '../hooks/useFetch';
import { fetchPlanets } from '../utils/SwapiCalls';

function GeneralProvider({ children }) {
  const { isLoading, fetchData } = useFetch();
  const [planets, setPlanets] = useState([]);
  const [planetsHeader, setPlanetsHeader] = useState([]);
  const [inputField, setInputField] = useState('');
  const [sortSelectTagValue, setSortSelectTagValue] = useState({
    sortFilterColumn: '',
    typeOfSort: '',
  });
  const [allSelectedTagValues, setAllSelectedTagValues] = useState([]);
  const planetsApiCall = useCallback(async () => {
    await fetchData(fetchPlanets, setPlanets);
  }, [fetchData]);

  useEffect(() => {
    planetsApiCall();
  }, []);

  const handlePlanetsHeaders = useCallback(() => {
    const planetsKeys = Object.keys(planets[0]);
    setPlanetsHeader(planetsKeys);
  }, [planets]);

  useEffect(() => {
    if (planets.length) {
      handlePlanetsHeaders();
    }
  }, [planets, handlePlanetsHeaders]);

  const values = {
    isLoading,
    planets,
    planetsHeader,
    inputField,
    setInputField,
    allSelectedTagValues,
    setAllSelectedTagValues,
    sortSelectTagValue,
    setSortSelectTagValue,
  };

  return (
    <GeneralContext.Provider value={ values }>
      {children}
    </GeneralContext.Provider>
  );
}

GeneralProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GeneralProvider;
