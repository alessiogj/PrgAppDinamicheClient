// /src/services/authService.js
import bcrypt from 'bcryptjs';

const endpoint = 'https://TODO';

export const getSalt = async (username) => {
    const response = await fetch(`${endpoint}/getsalt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });

    if (!response.ok) {
        throw new Error('Unable to retrieve salt.');
    }

    const data = await response.json();
    return data.salt;
};

export const login = async (username, password, salt) => {
    const hashedPassword = bcrypt.hashSync(password, salt);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: hashedPassword })
    };

    const response = await fetch(`${endpoint}/login`, requestOptions);

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Invalid username or password.');
    }

    return response.json();
};
