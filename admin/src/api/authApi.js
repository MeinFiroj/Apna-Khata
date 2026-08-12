import axios from './axios.config.js'

export const registerFunc = async (data) => {
    try {
        const res = await axios.post('/api/admin/register', data);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
}

export const loginFunc = async (data) => {
    try {
        const res = await axios.post('/api/admin/login', data);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
}

export const getAdmin = async () => {
    try {
        const res = await axios.get('/api/admin/me');
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
}

export const logoutFunc = async () =>{
    try {
        const res = await axios.post('/api/admin/logout')
        return {success : true, data: res.data}
    } catch (error) {
        return {success : false, message : error.response?.data?.message || "Something went wrong"}
    }
}

export const forgotPassFunc = async (email) => {
    try {
        const res = await axios.post('/api/admin/forgot-password', {email})
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" }
    }
}

export const resetPassFunc = async (password, token) => {
    try {
        const res = await axios.post(`/api/admin/reset-password/${token}`, {password})
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" }
    }
}