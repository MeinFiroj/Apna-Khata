import axios from './axios.config.js'

export const addUser = async (userData) => {
    try {
        const res = await axios.post(`/api/admin/create-user`, userData)
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
}

export const getUsers = async () => {
    try {
        const res = await axios.get('/api/admin/users')
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
}

export const searchUser = async (property) => {
    try {
        const res = await axios.get(`/api/admin/search-user?property=${property}`)
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
}

export const getDashTotals = async () => {
    try {
        const res = await axios.get(`/api/admin/dashboard-totals`)
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
}

export const getOverdueUsers = async () => {
    try {
        const res = await axios.get(`/api/admin/overdue`)
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
}

export const getUserLedger = async (id, page, limit) => {
    try {
        const res = await axios.get(`/api/admin/users/${id}/ledger?page=${page}&limit=${limit}`)
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
}


