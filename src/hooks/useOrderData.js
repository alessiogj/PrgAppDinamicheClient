import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {
  deleteOrder,
  putOrder,
  postOrder,
  getOrders,
} from '../Services/OrderService';
import { validateOrder } from './orderValidation';
import { formatDate } from '../components/utils/formatDate';

export const useOrderData = (initialData, type, userCode) => {
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem('jwtToken');
  const [orderData, setOrderData] = useState(initialData);
  const [editElement, setEditElement] = useState(null);
  const [addElement, setAddElement] = useState({
    agent_code: userCode,
    ord_amount: '',
    advance_amount: '',
    ord_date: '',
    cust_code: '',
    ord_description: '',
  });
  const [showAddOrderPanel, setShowAddOrderPanel] = useState(false);

  const fetchOrders = useCallback(async () => {
    if (!token) {
      enqueueSnackbar('Token non disponibile. Prova a fare il login.', {
        variant: 'error',
      });
      return;
    }
    try {
      const data = await getOrders(token, type);
      if (data && Array.isArray(data.orders)) {
        setOrderData(data.orders);
      } else {
        enqueueSnackbar('Errore nel recupero degli ordini. Riprova', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Errore nel recupero degli ordini:', error);
      enqueueSnackbar('Errore nel recupero degli ordini. Riprova.', {
        variant: 'error',
      });
    }
  }, [token, type, enqueueSnackbar]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleConfirmEdit = useCallback(async () => {
    try {
      editElement.ord_amount = parseFloat(editElement.ord_amount);
      editElement.advance_amount = parseFloat(editElement.advance_amount);

      validateOrder(editElement);

      const element = {
        modifiedOrder: { ...editElement, ord_num: Number(editElement.ord_num) },
      };
      await putOrder(token, element, type);
      enqueueSnackbar('Ordine aggiornato con successo!', {
        variant: 'success',
      });
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      enqueueSnackbar(
        error.message || "Errore nell'aggiornamento dell'ordine. Riprova.",
        { variant: 'error' }
      );
    }
    setEditElement(null);
  }, [editElement, token, enqueueSnackbar, fetchOrders, type]);

  const handleConfirmDelete = useCallback(async () => {
    try {
      const element = { ord_num: Number(editElement.ord_num) };
      await deleteOrder(token, element);
      enqueueSnackbar('Ordine eliminato con successo!', { variant: 'success' });
      await fetchOrders();
    } catch (error) {
      enqueueSnackbar("Errore nell'eliminazione dell'ordine. Riprova.", {
        variant: 'error',
      });
    }
    setEditElement(null);
  }, [editElement, token, enqueueSnackbar, fetchOrders]);

  const handleConfirmAdd = useCallback(async () => {
    console.log('Adding order:', addElement);
    try {
      addElement.ord_amount = parseFloat(addElement.ord_amount);
      addElement.advance_amount = parseFloat(addElement.advance_amount);

      validateOrder(addElement);

      formatDate(addElement.ord_date);
      const newOrder = { ...addElement };
      await postOrder(token, { newOrder });
      enqueueSnackbar('Ordine aggiunto con successo!', { variant: 'success' });
      await fetchOrders();
    } catch (error) {
      console.error('Error adding order:', error);
      enqueueSnackbar(
        error.message || "Errore nell'aggiunta dell'ordine. Riprova.",
        { variant: 'error' }
      );
    }
    setShowAddOrderPanel(false);
    setAddElement({
      agent_code: userCode,
      ord_amount: '',
      advance_amount: '',
      ord_date: '',
      cust_code: '',
      ord_description: '',
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
    setOrderData,
  };
};
