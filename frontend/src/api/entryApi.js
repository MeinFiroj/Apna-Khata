import axios from './axios.config.js'

export const addEntry = async (data) => {
    try {
        const res = await axios.post('/api/entries/', data)
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" }
    }
}

export const getEntries = async () => {
    try {
        const res = await axios.get('/api/entries/')
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" }
    }
}