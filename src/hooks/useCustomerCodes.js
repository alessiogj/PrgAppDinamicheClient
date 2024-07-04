import { useState, useEffect } from 'react';
import { getAvailableCustomers } from '../Services/OrderService';

export const useCustomerCodes = (token) => {
    const [customerCodes, setCustomerCodes] = useState([]);

    useEffect(() => {
        const fetchCustomerCodes = async () => {
            try {
                const result = await getAvailableCustomers(token);
                if (result && result.customers) {
                    setCustomerCodes(result.customers.map(customer => customer.cust_code));
                } else {
                    console.error('Invalid response format:', result);
                }
            } catch (error) {
                console.error('Error fetching customer codes:', error);
            }
        };

        fetchCustomerCodes();
    }, [token]);

    return customerCodes;
};
