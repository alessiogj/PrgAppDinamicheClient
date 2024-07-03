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
            const ordNum = Number(editElement.ord_num);
            const ordAmount = Number(editElement.ord_amount.trim());
            const advanceAmount = Number(editElement.advance_amount.trim());
            const ordDate = editElement.order_date.trim();
            const custCode = editElement.cust_code.trim();
            const agentCode = editElement.agent_code.trim();
            const ordDescription = editElement.ord_description.trim();

            if (isNaN(ordNum) || ordNum <= 0) {
                throw new Error('Order number is required and must be a valid number.');
            }

            if (isNaN(ordAmount) || ordAmount <= 0) {
                throw new Error('Order amount is required and must be a valid number.');
            }

            if (advanceAmount < 0) {
                throw new Error('Advance amount is required and must be a valid number.');
            }

            if (advanceAmount > ordAmount) {
                throw new Error('Advance amount cannot be greater than order amount.');
            }

            if (!ordDate) {
                throw new Error('Order date is required.');
            }

            if (!custCode) {
                throw new Error('Customer code is required.');
            }

            if (!ordDescription) {
                throw new Error('Order description is required.');
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
            enqueueSnackbar('Order updated successfully!', { variant: 'success' });
            await fetchOrders();
        } catch (error) {
            console.error('Error updating order:', error);
            enqueueSnackbar(error.message || 'Failed to update order. Please try again.', { variant: 'error' });
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

            const ordAmount = Number(addElement.ord_amount.trim());
            const advanceAmount = Number(addElement.advance_amount.trim());
            const ordDate = addElement.order_date.trim();
            const custCode = addElement.cust_code.trim();
            const agentCode = addElement.agent_code.trim();
            const ordDescription = addElement.ord_description.trim();

            if (!ordAmount || isNaN(ordAmount)) {
                throw new Error('Order amount is required and must be a valid number.');
            }

            if (advanceAmount < 0) {
                throw new Error('Advance amount is required and must be a valid number.');
            }

            if (advanceAmount > ordAmount) {
                throw new Error('Advance amount cannot be greater than order amount.');
            }

            if (!ordDate) {
                throw new Error('Order date is required.');
            }

            if (!custCode) {
                throw new Error('Customer code is required.');
            }

            if (!ordDescription) {
                throw new Error('Order description is required.');
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
            enqueueSnackbar('Order added successfully!', { variant: 'success' });
            await fetchOrders();
        } catch (error) {
            console.error('Error adding order:', error);
            enqueueSnackbar(error.message || 'Failed to add order. Please try again.', { variant: 'error' });
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
