import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import useLocalStorage from '../../../hooks/useLocalStorage';

const OrderChart = ({ data }) => {
  const theme = useTheme();
  const [chartHeight, setChartHeight] = useState(400);
  const [showTable, setShowTable] = useLocalStorage('showTable', false);

  useEffect(() => {
    const handleResize = () => {
      setChartHeight(window.innerHeight / 3);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      toggleDisplay();
    }
  };

  const toggleDisplay = () => {
    setShowTable(!showTable);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={showTable}
            onChange={toggleDisplay}
            tabIndex={0}
            onKeyDown={handleKeyPress}
            inputProps={{ 'aria-label': 'Mostra Grafico' }}
          />
        }
        label={showTable ? 'Mostra Grafico' : 'Mostra Dati Tabellari'}
      />
      {showTable ? (
        <div className="table-container">
          <div className="scrollable-table" tabIndex="0">
            <TableContainer component={Paper}>
              <Table
                className="data-table"
                aria-label="Tabella dei dati degli ordini"
              >
                <TableHead>
                  <TableRow aria-label="Intestazioni della tabella">
                    <TableCell
                      tabIndex={0}
                      aria-label="Colonna della data dell'ordine"
                    >
                      Data Ordine
                    </TableCell>
                    <TableCell
                      tabIndex={0}
                      aria-label="Colonna dell'importo dell'ordine"
                    >
                      Importo Ordine
                    </TableCell>
                    <TableCell
                      tabIndex={0}
                      aria-label="Colonna dell'importo anticipato"
                    >
                      Importo Anticipato
                    </TableCell>
                    <TableCell
                      tabIndex={0}
                      aria-label="Colonna dell'importo residuo"
                    >
                      Importo Residuo
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow
                      key={index}
                      aria-label={`Riga numero ${index + 1}`}
                    >
                      <TableCell
                        tabIndex={0}
                        aria-label={`Data Ordine della riga ${index + 1}: ${row.ord_date}`}
                      >
                        {row.ord_date}
                      </TableCell>
                      <TableCell
                        tabIndex={0}
                        aria-label={`Importo Ordine della riga ${index + 1}: ${row.ord_amount}`}
                      >
                        {row.ord_amount}
                      </TableCell>
                      <TableCell
                        tabIndex={0}
                        aria-label={`Importo Anticipato della riga ${index + 1}: ${row.advance_amount || 0}`}
                      >
                        {row.advance_amount || 0}
                      </TableCell>
                      <TableCell
                        tabIndex={0}
                        aria-label={`Importo Residuo della riga ${index + 1}: ${row.outstanding_amt || 0}`}
                      >
                        {row.outstanding_amt || 0}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <LineChart
            data={data}
            aria-label="Grafico a linee che mostra l'importo dell'ordine, l'importo anticipato e l'importo residuo nel tempo"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="ord_date"
              aria-label="Asse X che mostra le date degli ordini"
            />
            <YAxis aria-label="Asse Y che mostra gli importi degli ordini in valuta" />
            <Tooltip aria-label="Tooltip che mostra i dettagli dei dati quando si passa con il mouse" />
            <Legend aria-label="Legenda che descrive le linee del grafico" />
            <Line
              type="monotone"
              dataKey="ord_amount"
              name="Importo Ordine"
              stroke={theme.palette.line.orderAmount}
              strokeWidth={2}
              dot={true}
              activeDot={{ r: 8 }}
              tabIndex={0}
              aria-label="Linea che rappresenta l'importo totale degli ordini"
            />
            <Line
              type="monotone"
              dataKey="advance_amount"
              name="Importo Anticipato"
              stroke={theme.palette.line.advanceAmount}
              strokeWidth={2}
              dot={true}
              activeDot={{ r: 8 }}
              tabIndex={0}
              aria-label="Linea che rappresenta l'importo anticipato degli ordini"
            />
            <Line
              type="monotone"
              dataKey="outstanding_amt"
              name="Importo Residuo"
              stroke={theme.palette.line.outstandingAmount}
              strokeWidth={2}
              dot={true}
              activeDot={{ r: 8 }}
              tabIndex={0}
              aria-label="Linea che rappresenta l'importo residuo degli ordini"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

OrderChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ord_date: PropTypes.string.isRequired,
      ord_amount: PropTypes.number.isRequired,
      advance_amount: PropTypes.number,
      outstanding_amt: PropTypes.number,
    })
  ).isRequired,
};

export default OrderChart;
