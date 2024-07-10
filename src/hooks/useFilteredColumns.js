import { useMemo } from 'react';

// Regole di visibilità specificate per ogni colonna in base al tipo di utente.
const columnVisibilityRules = {
  cust_name: ['agent', 'dirigent'],
  agent_name: ['customer', 'dirigent'],
  commission: ['customer', 'dirigent'],
};

/**
 * Determina se una colonna dovrebbe essere mostrata basandosi sul tipo di utente.
 *
 * @param {String} column Nome della colonna da valutare.
 * @param {String} type Tipo di utente corrente.
 * @returns {Boolean} Ritorna true se la colonna deve essere mostrata, altrimenti false.
 */
const shouldShowColumn = (column, type) => {
  return columnVisibilityRules[column]
    ? columnVisibilityRules[column].includes(type)
    : true;
};

/**
 * Hook che filtra le colonne da visualizzare basandosi sul tipo di utente e sulle definizioni delle colonne.
 *
 * @param {Object} columnDefinitions Definizioni delle colonne con i nomi visualizzati.
 * @param {String} type Tipo di utente, che può limitare le colonne disponibili.
 * @returns {Array} Ritorna un array di colonne filtrate.
 */
const useFilteredColumns = (columnDefinitions, type) => {
  return useMemo(() => {
    return Object.keys(columnDefinitions).filter((column) =>
      shouldShowColumn(column, type)
    );
  }, [columnDefinitions, type]);
};

export default useFilteredColumns;
