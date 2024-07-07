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
    ResponsiveContainer
} from 'recharts';
import { Switch, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import useLocalStorage from '../../../hooks/useLocalStorage';

function OrderChart({ data }) {
    const theme = useTheme();
    const [chartHeight, setChartHeight] = useState(400);
    const [showTable, setShowTable] = useLocalStorage('showTable', false); // Use the custom hook

    useEffect(() => {
        const handleResize = () => {
            setChartHeight(window.innerHeight / 3);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDisplay = () => {
        setShowTable(!showTable);
    };

    return (
        <div>
            <FormControlLabel
                control={<Switch checked={showTable} onChange={toggleDisplay} />}
                label={showTable ? "Mostra Grafico" : "Mostra Dati Tabellari"}
            />
            {showTable ? (
                <div className="table-container">
                    <div className="scrollable-table">
                        <TableContainer component={Paper}>
                            <Table className="data-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data Ordine</TableCell>
                                        <TableCell>Importo Ordine</TableCell>
                                        <TableCell>Importo Anticipato</TableCell>
                                        <TableCell>Importo Residuo</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.ord_date}</TableCell>
                                            <TableCell>{row.ord_amount}</TableCell>
                                            <TableCell>{row.advance_amount || 0}</TableCell>
                                            <TableCell>{row.outstanding_amt || 0}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ord_date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ord_amount" stroke={theme.palette.line.orderAmount} strokeWidth={2} dot={true} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="advance_amount" stroke={theme.palette.line.advanceAmount} strokeWidth={2} dot={true} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="outstanding_amt" stroke={theme.palette.line.outstandingAmount} strokeWidth={2} dot={true} activeDot={{ r: 8 }} />
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
