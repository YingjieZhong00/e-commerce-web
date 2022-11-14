import { publicRequest, userRequest } from "../requestMethods";
import { addProduct } from "./cartRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import {getCart} from './cartRedux'

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        console.log(err.response.data)
        dispatch(loginFailure(err.response.data))
    }
}

const GetProduct = async(req) =>{
    try {
        const res = await publicRequest.get("/products/find/" + req.productId)
        return res.data
    } catch (error) {
        
    }
}

export const getCartItems = async (dispatch) =>{
    try {
        const res = await userRequest.get("/carts/find")
        res.data.products.map(product => {
    
        })
        
        console.log(res.data.products)
        dispatch(getCart(res.data))
    } catch (error) {
        
    }
}


export const addToCart = async (dispatch, product) =>{
    dispatch(addProduct());
    try {
        const res = await userRequest.get("/carts/find")
    } catch (err) {
        
    }
}