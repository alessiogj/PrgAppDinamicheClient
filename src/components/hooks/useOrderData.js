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
            enqueueSnackbar('Token not available. Please log in again.', { variant: 'error' });
            return;
        }
        try {
            const data = await getOrders(token, type);
            if (data && Array.isArray(data.orders)) {
                setOrderData(data.orders);
            } else {
                enqueueSnackbar('Failed to fetch orders.', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            enqueueSnackbar('Failed to fetch orders.', { variant: 'error' });
        }
    }, [token, type, enqueueSnackbar]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleConfirmEdit = useCallback(async () => {
        try {
            const element = {
                modifiedOrder: {
                    ord_num: Number(editElement.ord_num),
                    ord_amount: Number(editElement.ord_amount.trim()),
                    advance_amount: Number(editElement.advance_amount.trim()),
                    ord_date: editElement.order_date.trim(),
                    cust_code: editElement.cust_code.trim(),
                    agent_code: editElement.agent_code.trim(),
                    ord_description: editElement.ord_description
                }
            };
            await putOrder(token, element, type);
            enqueueSnackbar('Order updated successfully!', { variant: 'success' });
            await fetchOrders();
        } catch (error) {
            enqueueSnackbar('Failed to update order. Please try again.', { variant: 'error' });
        }
        setEditElement(null);
    }, [editElement, token, enqueueSnackbar, fetchOrders, type]);

    const handleConfirmDelete = useCallback(async () => {
        try {
            const element = {
                ord_num: Number(editElement.ord_num)
            };
            await deleteOrder(token, element);
            enqueueSnackbar('Order deleted successfully!', { variant: 'success' });
            await fetchOrders();
        } catch (error) {
            enqueueSnackbar('Failed to delete order. Please try again.', { variant: 'error' });
        }
        setEditElement(null);
    }, [editElement, token, enqueueSnackbar, fetchOrders]);

    const handleConfirmAdd = useCallback(async () => {
        try {
            if (!userCode) {
                throw new Error('User code is not available.');
            }
            const newOrder = {
                ord_amount: Number(addElement.ord_amount.trim()),
                advance_amount: Number(addElement.advance_amount.trim()),
                ord_date: addElement.order_date.trim(),
                cust_code: addElement.cust_code.trim(),
                agent_code: addElement.agent_code.trim(),
                ord_description: addElement.ord_description
            };
            await postOrder(token, { newOrder });
            enqueueSnackbar('Order added successfully!', { variant: 'success' });
            await fetchOrders();
        } catch (error) {
            console.error('Error adding order:', error);
            enqueueSnackbar('Failed to add order. Please try again.', { variant: 'error' });
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
