const endpointAgent = 'http://localhost:3100/agents';
const endpointDirigent = 'http://localhost:3100/dirigents';
const endpointCustomer = 'http://localhost:3100/customers';

export const getOrders = async (token, type) => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    let orderResponse;
    if (type === 'agent') {
      orderResponse = await fetch(`${endpointAgent}/getOrders`, requestOptions);
    } else if (type === 'customer') {
      orderResponse = await fetch(
        `${endpointCustomer}/getOrders`,
        requestOptions
      );
    } else if (type === 'dirigent') {
      orderResponse = await fetch(
        `${endpointDirigent}/getOrders`,
        requestOptions
      );
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

export const putOrder = async (token, order, type) => {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    };
    const orderResponse =
      type === 'agent'
        ? await fetch(`${endpointAgent}/modifyOrder`, requestOptions)
        : await fetch(`${endpointDirigent}/modifyOrder`, requestOptions);

    if (!orderResponse.ok) {
      const data = await orderResponse.json();
      throw new Error(data.message || 'Invalid request.');
    }
  } catch (error) {
    console.error('Error on adding order:', error);
    throw error;
  }
};

export const deleteOrder = async (token, order) => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    };

    const orderResponse = await fetch(
      `${endpointAgent}/deleteOrder`,
      requestOptions
    );

    if (!orderResponse.ok) {
      const data = await orderResponse.json();
      throw new Error(data.message || 'Invalid request.');
    }
  } catch (error) {
    console.error('Error on deleting order:', error);
    throw error;
  }
};

export const postOrder = async (token, order) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    };

    const orderResponse = await fetch(
      `${endpointAgent}/addOrder`,
      requestOptions
    );

    if (!orderResponse.ok) {
      const data = await orderResponse.json();
      throw new Error(data.message || 'Invalid request.');
    }

    const responseData = await orderResponse.json();
    return responseData.newOrder;
  } catch (error) {
    console.error('Error on adding order:', error);
    throw error;
  }
};

export const getAvailableCustomers = async (token) => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      `${endpointAgent}/getAvailableCustomers`,
      requestOptions
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Invalid request.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error on getting customer info:', error);
    throw error;
  }
};
