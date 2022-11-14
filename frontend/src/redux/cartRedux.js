import { createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct:(state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct:(state, action) =>{
            const productId = action.payload;
            state.quantity > 1 ? state.quantity -= 1 : state.quantity = 0;
            state.products = state.products.filter(product => product._id !== productId)
            state.total -= action.payload.price * action.payload.quantity;
        },
        clearCart:(state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        getCart:(state, action) =>{
            //action.payload.products.map(product => state.products.push(product))
            action.payload.products.map(product => console.log(product))
        }
    }
});


export const {addProduct, removeProduct, clearCart, getCart} = cartSlice.actions;
export default cartSlice.reducer;