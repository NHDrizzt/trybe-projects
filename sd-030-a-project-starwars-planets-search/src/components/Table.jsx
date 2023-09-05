import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';
import TableRow from './TableRow';

function Table() {
  const { isLoading, planetsHeader } = useContext(GeneralContext);
  if (isLoading) return <div>Loading...</div>;
  return (
    <table>
      <thead>
        <tr>
          {
            planetsHeader.map((header, index) => (
              <th key={ index }>{header}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        <TableRow />
      </tbody>
    </table>
  );
}

export default Table;
