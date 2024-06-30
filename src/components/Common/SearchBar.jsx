import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ search, onSearchChange }) {
    return (
        <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="search-input"
        />
    );
}

SearchBar.propTypes = {
    search: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
