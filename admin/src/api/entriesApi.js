import axios from './axios.config.js'

export const addEntry = async (custId, entryData) => {
    try {
        const res = await axios.post(`/api/entries/${custId}`, entryData)
        console.log(res)
        return { success: true, data: res.data }
    } catch (error) {
        console.log(error)
        return { success: false, message: error.response?.data?.message || "Something went wrong" }
    }
}

export const getEntries = async ({ limit, page, today, pending }) => {
    let checkToday = today ? "&today=true" : '';
    const url = pending ? 'pendings' : `all?page=${page}&limit=${limit}${checkToday}`
    try {
        const res = await axios.get(`/api/entries/${url}`)
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" }
    }
}

export const updateEntry = async ({ id, rejectionReason }) => {
    const action = rejectionReason ? 'reject' : 'verify'
    try {
        const res = await axios.patch(`/api/entries/${id}/${action}`, {rejectionReason})
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" }
    }
}
