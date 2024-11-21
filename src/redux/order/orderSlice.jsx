import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddCart: (state, action) => {
            let cart = state.cart
            const item = action.payload
            let isExitsIndex = cart.findIndex((c) => c._id === item._id)
            if (isExitsIndex > -1) {
                cart[isExitsIndex].quantity = cart[isExitsIndex].quantity + item.quantity
                if (cart[isExitsIndex].quantity > cart[isExitsIndex].detail.quantity) {
                    cart[isExitsIndex].quantity = cart[isExitsIndex].detail.quantity
                }
            }
            else {
                cart.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
            }
            state.cart = cart
        },
        doUpdateCart: (state, action) => {
            let cart = state.cart
            const item = action.payload
            let isExitsIndex = cart.findIndex((c) => c._id === item._id)
            if (isExitsIndex > -1) {
                cart[isExitsIndex].quantity = cart[isExitsIndex].quantity + item.quantity
                if (cart[isExitsIndex].quantity > cart[isExitsIndex].detail.quantity) {
                    cart[isExitsIndex].quantity = cart[isExitsIndex].detail.quantity
                }
            }
            else {
                cart.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
            }
            state.cart = cart
        },
        doDeleteItemCartAction: (state, action) => {
            state.cart = state.cart.filter(c => c._id !== action.payload._id);
        },
        doPlaceOrder: (state, action) => {
            state.cart = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { doAddCart, doUpdateCart, doDeleteItemCartAction, doPlaceOrder } = orderSlice.actions

export default orderSlice.reducer