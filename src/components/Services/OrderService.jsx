const endpoint = 'http://localhost:3100/users';

export const getOrders = async (token) => {
    try {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const orderResponse = await fetch(`${endpoint}/getAgentOrders`, requestOptions);

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

