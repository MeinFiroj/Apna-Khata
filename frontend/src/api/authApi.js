import axios from './axios.config.js'

export const registerUser = async(data) =>{
    try {
        const res = await axios.post('/api/user/register', data)
        return {success : true, data : res.data}
    } catch (error) {
        return {success : false, message : error.response?.data?.message || "Something went wrong"}
    }
}

export const loginUser = async(data) =>{
    try {
        const res = await axios.post('/api/user/login', data)
        return {success : true, data : res.data}
    } catch (error) {
        return {success : false, message : error.response?.data?.message || "Something went wrong"}
    }
}

export const activeUser = async() =>{
    try {
        const res = await axios.get('/api/user/me')
        return {success : true, data : res.data}
    } catch (error) {
        return {success : false, message : error.response?.data?.message || "Something went wrong"}
    }
}