import React from 'react';
import './App.css';
import Table from './components/Table';
import TableInputFilter from './components/TableInputFilter';
import Filters from './components/Filters';

function App() {
  return (
    <div>
      <TableInputFilter />
      <Filters />
      <Table />
    </div>
  );
}

export default App;
