import {ADD_TO_CART,SUB_TO_CART} from '../constants'
export const addToCart =(data)=>{
     console.warn("action",data)
    return {
        type:ADD_TO_CART,
        data:data
    }
}


export const subToCart =(data)=>{
    console.warn("action",data)
   return {
       type:SUB_TO_CART,
       data:data
   }
}