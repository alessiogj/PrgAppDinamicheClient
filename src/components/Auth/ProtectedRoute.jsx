import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import as default
import axios from 'axios';

const endpoint = 'http://localhost:3100/users';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                    const response = await axios.post(`${endpoint}/verify-token`, { token });

                    if (response.data.valid) {
                        setIsAuthenticated(true);
                    } else {
                        localStorage.removeItem('jwtToken');
                        setIsAuthenticated(false);
                    }
                } else {
                    localStorage.removeItem('jwtToken');
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Token verification error:', error);
                localStorage.removeItem('jwtToken');
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, [token]);

    if (isAuthenticated === null) {
        // Show a loading indicator while verifying the token
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
