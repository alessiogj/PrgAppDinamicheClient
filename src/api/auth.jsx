import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/'; // URL base per il servizio di autenticazione

// Funzione per registrare un nuovo utente
const register = async (userData) => {
    const response = await axios.post(`${API_URL}register`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Funzione per eseguire il login di un utente
const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Funzione per eseguire il logout
const logout = () => {
    localStorage.removeItem('user');
};

// Funzione per ottenere le informazioni dell'utente attualmente loggato
const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export default {
    register,
    login,
    logout,
    getCurrentUser
};
