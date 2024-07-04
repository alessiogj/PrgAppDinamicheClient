import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { deleteOrder, putOrder, postOrder, getOrders } from '../Services/OrderService';

export const useOrderData = (initialData, type, userCode) => {
    const { enqueueSnackbar } = useSnackbar();
    const token = localStorage.getItem('jwtToken');
    const [orderData, setOrderData] = useState(initialData);
    const [editElement, setEditElement] = useState(null);
    const [addElement, setAddElement] = useState({
        agent_code: userCode,
        ord_amount: '',
        advance_amount: '',
        order_date: '',
        cust_code: '',
        ord_description: ''
    });
    const [showAddOrderPanel, setShowAddOrderPanel] = useState(false);

    useEffect(() => {
        setOrderData(initialData);
    }, [initialData]);

    const fetchOrders = useCallback(async () => {
        if (!token) {
            enqueueSnackbar('Token non disponibile. Prova a fare il login.', { variant: 'error' });
            return;
        }
        try {
            const data = await getOrders(token, type);
            if (data && Array.isArray(data.orders)) {
                setOrderData(data.orders);
            } else {
                enqueueSnackbar('Errore nel recupero degli ordini. Riprova', { variant: 'error' });
            }
        } catch (error) {
            console.error('Errore nel recupero degli ordini:', error);
            enqueueSnackbar('Errore nel recupero degli ordini. Riprova.', { variant: 'error' });
        }
    }, [token, type, enqueueSnackbar]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleConfirmEdit = useCallback(async () => {
        try {
            const ordNum = Number(editElement.ord_num);
            const ordAmount = Number(editElement.ord_amount.trim());
            const advanceAmount = Number(editElement.advance_amount.trim());
            const ordDate = editElement.order_date.trim();
            const custCode = editElement.cust_code.trim();
            const agentCode = editElement.agent_code.trim();
            const ordDescription = editElement.ord_description.trim();

            if (isNaN(ordNum) || ordNum <= 0) {
                throw new Error('Il numero di ordine è richiesto e deve essere un numero valido.');
            }

            if (isNaN(ordAmount) || ordAmount <= 0) {
                throw new Error('L\'importo dell\'ordine è richiesto e deve essere un numero valido.');
            }

            if (advanceAmount < 0) {
                throw new Error('L\'importo anticipato è richiesto e deve essere un numero valido.');
            }

            if (advanceAmount > ordAmount) {
                throw new Error('L\'importo anticipato non può essere maggiore dell\'importo dell\'ordine.');
            }

            if (!ordDate) {
                throw new Error('La data dell\'ordine è richiesta.');
            }
            if (new Date(ordDate) > new Date()) {
                throw new Error('La data dell\'ordine non può essere futura.');
            }

            if (!custCode) {
                throw new Error('Il codice cliente è richiesto.');
            }

            if (!ordDescription) {
                throw new Error('La descrizione dell\'ordine è richiesta.');
            }

            const element = {
                modifiedOrder: {
                    ord_num: ordNum,
                    ord_amount: ordAmount,
                    advance_amount: advanceAmount,
                    ord_date: ordDate,
                    cust_code: custCode,
                    agent_code: agentCode,
                    ord_description: ordDescription
                }
            };

            await putOrder(token, element, type);
            enqueueSnackbar('Ordine aggiornato con successo!', { variant: 'success' });
            await fetchOrders();
        } catch (error) {
            console.error('Error updating order:', error);
            enqueueSnackbar(error.message || 'Errore nell\'aggiornamento dell\'ordine. Riprova.', { variant: 'error' });
        }
        setEditElement(null);
    }, [editElement, token, enqueueSnackbar, fetchOrders, type]);

    const handleConfirmDelete = useCallback(async () => {
        try {
            const element = {
                ord_num: Number(editElement.ord_num)
            };
            await deleteOrder(token, element);
            enqueueSnackbar('Ordine eliminato con successo!', { variant: 'success' });
            await fetchOrders();
        } catch (error) {
            enqueueSnackbar('Errore nell\'eliminazione dell\'ordine. Riprova.', { variant: 'error' });
        }
        setEditElement(null);
    }, [editElement, token, enqueueSnackbar, fetchOrders]);

    const handleConfirmAdd = useCallback(async () => {
        try {

            const ordAmount = Number(addElement.ord_amount);
            const advanceAmount = Number(addElement.advance_amount);
            const ordDate = addElement.order_date;
            const custCode = addElement.cust_code;
            const agentCode = addElement.agent_code.trim();
            const ordDescription = addElement.ord_description.trim();

            if (!ordAmount || isNaN(ordAmount)) {
                throw new Error('L\'importo dell\'ordine è richiesto e deve essere un numero valido.');
            }

            if (advanceAmount < 0) {
                throw new Error('L\'importo anticipato è richiesto e deve essere un numero valido.');
            }

            if (advanceAmount > ordAmount) {
                throw new Error('L\'importo anticipato non può essere maggiore dell\'importo dell\'ordine.');
            }

            if (!ordDate) {
                throw new Error('La data dell\'ordine è richiesta.');
            }
            if (new Date(ordDate) > new Date()) {
                throw new Error('La data dell\'ordine non può essere futura.');
            }

            if (!custCode) {
                throw new Error('Il codice cliente è richiesto.');
            }

            if (!ordDescription) {
                throw new Error('La descrizione dell\'ordine è richiesta.');
            }

            const newOrder = {
                ord_amount: ordAmount,
                advance_amount: advanceAmount,
                ord_date: ordDate,
                cust_code: custCode,
                agent_code: agentCode,
                ord_description: ordDescription
            };

            await postOrder(token, { newOrder });
            enqueueSnackbar('Ordine aggiunto con successo!', { variant: 'success' });
            await fetchOrders();
        } catch (error) {
            console.error('Error adding order:', error);
            enqueueSnackbar(error.message || 'Errore nell\'aggiunta dell\'ordine. Riprova.', { variant: 'error' });
        }

        setShowAddOrderPanel(false);
        setAddElement({
            agent_code: userCode,
            ord_amount: '',
            advance_amount: '',
            order_date: '',
            cust_code: '',
            ord_description: ''
        });
    }, [token, addElement, userCode, enqueueSnackbar, fetchOrders]);

    return {
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
        fetchOrders,
        setOrderData
    };
};
