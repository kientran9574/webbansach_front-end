import axios from "../utils/Axios-Customize"
export const postRegister = (fullName, email, password, phone) => {
    return axios.post(`api/v1/user/register`, { fullName, email, password, phone })
}

export const postLogin = (username, password) => {
    return axios.post(`api/v1/auth/login`, { username, password })
}

export const fetchAccount = () => {
    return axios.get(`api/v1/auth/account`)
}
export const logoutAccess = () => {
    return axios.post(`api/v1/auth/logout`)
}
export const getListUser = (query) => {
    return axios.get(`api/v1/user?${query}`)
}
export const postCreateUser = (params) => {
    return axios.post(`api/v1/user`, params)
}
export const putCreateUser = (fullName, phone, _id) => {
    return axios.put(`api/v1/user`, { fullName, _id, phone })
}
export const deleteUser = (userId) => {
    return axios.delete(`api/v1/user/${userId}`)
}
export const postCreateUserBulk = (data) => {
    return axios.post(`api/v1/user/bulk-create`, data)
}
// Book
export const getListBooksApi = (query) => {
    return axios.get(`api/v1/book?${query}`)
}
export const getListCategoryApi = () => {
    return axios.get(`api/v1/database/category`)
}
export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}
export const postCreateBook = (mainText, author, category, price, sold, quantity, thumbnail, slider) => {
    return axios.post(`api/v1/book`, { mainText, author, category, price, sold, quantity, thumbnail, slider })
}
export const putUpdateBook = (_id, mainText, author, category, price, sold, quantity, thumbnail, slider) => {
    return axios.put(`api/v1/book/${_id}`, { _id, mainText, author, category, price, sold, quantity, thumbnail, slider })
}
export const deleteBook = (_id) => {
    return axios.delete(`api/v1/book/${_id}`)
}
export const callFetchBookById = (id) => {
    return axios.get(`api/v1/book/${id}`)
}
// order
export const callPlaceOrder = (data) => {
    return axios.post('api/v1/order', {
        ...data
    })
}
export const callOrderHistory = () => {
    return axios.get('/api/v1/history');
}
export const callUploadAvatar = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "avatar"
        },
    });
}
export const callUpdateUserInfo = (_id, fullName, phone, avatar) => {
    return axios.put(`api/v1/user`, { _id, fullName, phone, avatar })
}
export const callUpdatePassword = (email, oldpass, newpass) => {
    return axios.post(`/api/v1/user/change-password`, {
        email, oldpass, newpass
    })
}
export const callFetchDashboard = () => {
    return axios.get('/api/v1/database/dashboard')
}
