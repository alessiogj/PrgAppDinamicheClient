const endpoint = 'http://localhost:3100/users';

export const getOrders = async (token, type) => {
    try {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        let orderResponse;
        if (type === 'agent') {
            orderResponse = await fetch(`${endpoint}/getAgentOrders`, requestOptions);
        }else if (type === 'customer') {
            orderResponse = await fetch(`${endpoint}/getCustomerOrders`, requestOptions);
        }

        if (!orderResponse.ok) {
            const data = await orderResponse.json();
            throw new Error(data.message || 'Invalid request.');
        }

        return await orderResponse.json();
    } catch (error) {
        console.error('Error on fetching orders:', error);
        throw error;
    }
};

