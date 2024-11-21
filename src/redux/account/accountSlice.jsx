import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    user: {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
    },
    tempAvatar: ""
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAccount: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        doFetcherAccount: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload.user
        },
        doLogoutAccount: (state, action) => {
            state.isAuthenticated = false
            localStorage.removeItem("access_token")
            state.user = {}
        },

        doUploadAvatarAction: (state, action) => {
            state.tempAvatar = action.payload.avatar
        },

        doUpdateUserInfo: (state, action) => {
            state.user.avatar = action.payload.avatar
            state.user.fullName = action.payload.fullName
            state.user.phone = action.payload.phone
        }
    },
})

// Action creators are generated for each case reducer function
export const { doLoginAccount, doFetcherAccount, doLogoutAccount, doUploadAvatarAction, doUpdateUserInfo } = accountSlice.actions

export default accountSlice.reducer