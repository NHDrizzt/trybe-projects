// const checkData = (res) => {
//   if (!res) {
//     throw new Error('Api Failed kekw');
//   }
// };

const fetchDataPlanets = async (url) => {
  const response = await fetch(url);
  // checkData(response);
  const result = await response.json();
  result.results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  return result;
};

export const fetchPlanets = async () => fetchDataPlanets('https://swapi.dev/api/planets');
