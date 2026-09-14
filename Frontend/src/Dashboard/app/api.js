import api from '../../config/api';

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return {
            status: true,
            message: response.data.message || 'Login successful',
            user: response.data.user,
            token: response.data.token,
        };
    } catch (error) {
        return {
            status: false,
            message: error.response?.data?.message || 'Login failed',
        };
    }
};