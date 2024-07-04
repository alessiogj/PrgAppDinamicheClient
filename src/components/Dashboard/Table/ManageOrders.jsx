// src/Common/ManageOrders.jsx
import React from 'react';
import TableWithSearch from './TableWithSearch';

/**
 * ManageOrders agisce come container per TableWithSearch, offrendo un'interfaccia per la gestione degli ordini.
 * Visualizza un titolo e passa i dati e le configurazioni necessarie a TableWithSearch.
 *
 * @param {Array} tableData - Dati iniziali per popolare la tabella.
 * @param {string} userRole - Ruolo dell'utente, determina il comportamento specifico nella tabella.
 * @param {string} userCode - Codice identificativo dell'utente, usato per operazioni specifiche.
 * @param {Function} onUpdate - Callback chiamata dopo operazioni che richiedono un aggiornamento dei dati.
 */
function ManageOrders({ tableData, userRole, userCode, onUpdate }) {
    return (
        <div className="widget">
            <h2>Gestisci gli ordini</h2>
            <TableWithSearch
                initialData={tableData}
                type={userRole}
                userCode={userCode}
                onUpdate={onUpdate}
            />
        </div>
    );
}

export default ManageOrders;
