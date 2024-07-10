import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * SearchBar offre una barra di ricerca configurabile per filtrare i dati visualizzati.
 * Include un'icona di ricerca e può essere integrata in qualsiasi contesto che richieda un filtro di ricerca.
 *
 * @param {string} search - Valore corrente della ricerca.
 * @param {Function} onSearchChange - Funzione chiamata quando il valore di ricerca cambia.
 */
const SearchBar = ({ search, onSearchChange }) => {
  return (
    <TextField
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Cerca..."
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      aria-label="Barra di ricerca"
      label="Cerca"
      fullWidth
    />
  );
};

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
