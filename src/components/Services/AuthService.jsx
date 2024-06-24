import bcrypt from 'bcryptjs';

const endpoint = 'http://localhost:3100/users';

export const getSalt = async (username) => {
    try {
        const response = await fetch(`${endpoint}/salt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch.');
        }

        const data = await response.json();
        return data.salt;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const login = async (username, password, salt) => {
    try {
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
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
