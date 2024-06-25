import bcrypt from 'bcryptjs';

const endpoint = 'http://localhost:3100/users';

export const login = async (username, password) => {
    try {
        const response = await fetch(`${endpoint}/salt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid username or password.');
        }

        const { salt } = await response.json();
        const hashedPassword = bcrypt.hashSync(password, salt);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: hashedPassword })
        };

        const loginResponse = await fetch(`${endpoint}/login`, requestOptions);

        if (!loginResponse.ok) {
            const data = await loginResponse.json();
            throw new Error(data.message || 'Invalid username or password.');
        }

        return await loginResponse.json();
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};
