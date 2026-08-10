import axios from './axios.config.js'

export const register = async (data) => {
    try {
        const res = await axios.post('/api/admin/register', data);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
}

export const login = async (data) => {
    try {
        const res = await axios.post('/api/admin/login', data);
        return {success : true, data : res.data};
    } catch (error) {
        return {success : false, message : error.response?.data?.message || "Something went wrong"};
    }
}

export const getAdmin = async () => {
    try {
        const res = await axios.get('/api/admin/me');
        return {success : true, data : res.data};
    } catch (error) {
        return {success : false, message : error.response?.data?.message || "Something went wrong"};
    }
}