import React from 'react';
import OrderChart from './OrderChart';

const Statistics = ({ chartData }) => {
  if (!chartData) {
    return <p>Caricamento dati...</p>;
  }

  return (
    <div className="widget">
      <h2 tabIndex={0}>Statistiche</h2>
      <OrderChart data={chartData} />
    </div>
  );
};

export default Statistics;
