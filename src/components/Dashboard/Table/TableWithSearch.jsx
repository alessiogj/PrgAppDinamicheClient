import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/TableWithSearch.css';
import SearchBar from './SearchBar';
import FilterCheckboxes from './FilterCheckboxes';
import DataTable from './DataTable';
import EditPanel from './Panels/EditPanel';
import VisualizePanel from './Panels/VisualizePanel';
import AddOrderPanel from './Panels/AddOrderPanel';
import DescriptionPanel from './Panels/DescriptionPanel';
import { useOrderData } from '../../../hooks/useOrderData';
import { useTableFilters } from '../../../hooks/useTableFilters';
import { useTableActions } from '../../../hooks/useTableActions';
import { useTableUpdates } from '../../../hooks/useTableUpdates';
import { Button } from '@mui/material';

const TableWithSearch = ({ initialData, type, userCode, onUpdate }) => {
  const {
    orderData,
    editElement,
    setEditElement,
    addElement,
    setAddElement,
    showAddOrderPanel,
    setShowAddOrderPanel,
    handleConfirmEdit,
    handleConfirmDelete,
    handleConfirmAdd,
  } = useOrderData(initialData, type, userCode);

  const columnDefinitions = useMemo(
    () => ({
      ord_num: { displayName: 'Numero Ordine', type: 'number' },
      ord_amount: { displayName: 'Importo Ordine', type: 'number' },
      advance_amount: { displayName: 'Importo Anticipato', type: 'number' },
      ord_date: { displayName: 'Data Ordine', type: 'date' },
      cust_name: { displayName: 'Cliente', type: 'string' },
      agent_name: { displayName: 'Agente', type: 'string' },
      description: { displayName: 'Descrizione Ordine', type: 'string' },
    }),
    []
  );

  const displayNames = useMemo(
    () => ({
      ord_num: 'Numero Ordine',
      ord_amount: 'Importo Ordine',
      advance_amount: 'Importo Anticipato',
      ord_date: 'Data Ordine',
      cust_code: 'Codice Cliente',
      agent_code: 'Codice Agente',
      ord_description: 'Descrizione Ordine',
    }),
    []
  );

  const {
    search,
    setSearch,
    visibleColumns,
    handleSort,
    sortConfig,
    handleColumnVisibilityChange,
    filteredData,
  } = useTableFilters(orderData, columnDefinitions, type);

  const [selectedDetails, setSelectedDetails] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  const {
    handleRowClick,
    handleEdit,
    handleInputChange,
    handleAddOrder,
    handleCancel,
  } = useTableActions(
    type,
    setEditElement,
    setShowAddOrderPanel,
    setShowTable,
    setSelectedDetails,
    setShowDescription
  );

  const {
    handleConfirmEditWithUpdate,
    handleConfirmDeleteWithUpdate,
    handleConfirmAddWithUpdate,
  } = useTableUpdates(
    handleConfirmEdit,
    handleConfirmDelete,
    handleConfirmAdd,
    onUpdate,
    setShowTable
  );

  return (
    <div
      className="table-container"
      aria-label="Contenitore della tabella con funzionalità di ricerca"
    >
      <div
        className="controls"
        aria-label="Sezione di controllo con barra di ricerca e filtri"
      >
        <SearchBar search={search} onSearchChange={setSearch} />
        <FilterCheckboxes
          columnDefinitions={columnDefinitions}
          visibleColumns={visibleColumns}
          handleColumnVisibilityChange={handleColumnVisibilityChange}
          type={type}
          aria-label="Filtri per selezionare le colonne da visualizzare"
        />
        {type === 'agent' && (
          <Button
            onClick={handleAddOrder}
            variant="contained"
            color="primary"
            aria-label="Aggiungi un nuovo ordine"
          >
            Aggiungi Ordine
          </Button>
        )}
      </div>
      {selectedDetails &&
        !showAddOrderPanel &&
        !editElement &&
        !showDescription && (
          <div
            className="info-card"
            aria-label="Scheda di visualizzazione dei dettagli dell'elemento selezionato"
          >
            <VisualizePanel
              element={selectedDetails}
              displayNames={displayNames}
              onClose={() => {
                setSelectedDetails(null);
                setShowTable(true);
              }}
              aria-label="Pannello di visualizzazione dei dettagli"
            />
          </div>
        )}
      {editElement && !showAddOrderPanel && (
        <div
          className="info-card"
          aria-label="Scheda di modifica dell'elemento selezionato"
        >
          <EditPanel
            editElement={editElement}
            displayNames={displayNames}
            handleInputChange={handleInputChange(setEditElement)}
            handleConfirmEdit={handleConfirmEditWithUpdate}
            handleConfirmDelete={handleConfirmDeleteWithUpdate}
            onCancel={handleCancel(
              editElement,
              setEditElement,
              setShowTable,
              setEditElement
            )}
            type={type}
            token={localStorage.getItem('jwtToken')}
            aria-label="Pannello di modifica dei dettagli"
          />
        </div>
      )}
      {showAddOrderPanel && !editElement && (
        <div
          className="info-card"
          aria-label="Scheda per aggiungere un nuovo ordine"
        >
          <AddOrderPanel
            addElement={addElement}
            displayNames={displayNames}
            handleInputChange={handleInputChange(setAddElement)}
            handleConfirmAdd={handleConfirmAddWithUpdate}
            onCancel={handleCancel(
              addElement,
              setAddElement,
              setShowTable,
              setShowAddOrderPanel
            )}
            token={localStorage.getItem('jwtToken')}
            aria-label="Pannello per aggiungere un nuovo ordine"
          />
        </div>
      )}
      {showDescription &&
        !showAddOrderPanel &&
        !editElement &&
        selectedDetails && (
          <div
            className="info-card"
            aria-label="Scheda di descrizione dell'elemento selezionato"
          >
            <DescriptionPanel
              ord_num={selectedDetails.ord_num}
              element={
                selectedDetails.ord_description || 'No description available'
              }
              onClose={() => {
                setShowDescription(false);
                setSelectedDetails(null);
                setShowTable(true);
              }}
              aria-label="Pannello di descrizione dell'ordine"
            />
          </div>
        )}
      {showTable && (
        <div
          className="scrollable-table"
          tabIndex="0"
          aria-label="Tabella dei dati degli ordini"
        >
          <DataTable
            filteredData={filteredData}
            visibleColumns={visibleColumns}
            columnDefinitions={columnDefinitions}
            handleSort={handleSort}
            sortConfig={sortConfig}
            handleRowClick={handleRowClick}
            handleEdit={handleEdit}
            type={type}
            handleShowDescription={(item) => {
              setSelectedDetails(item);
              setShowDescription(true);
              setShowTable(false);
            }}
            aria-label="Tabella dei dati filtrati e ordinati"
          />
        </div>
      )}
    </div>
  );
};

TableWithSearch.propTypes = {
  initialData: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['agent', 'customer', 'dirigent']).isRequired,
  userCode: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

export default TableWithSearch;
