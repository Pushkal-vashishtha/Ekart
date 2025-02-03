import { BASE_URL } from "@store/config"
import axios from "axios"


export const loginOrSignup  =async(phone:string,address:string)=>{
    console.log("API URL:", `${BASE_URL}/user/login`);
    try {
        const res = await axios.post(`${BASE_URL}/user/login`,{
            phone,
            address
        })
        return res.data.user
        
    } catch (error) {
        console.log("Login or Signup Error",error)
        return null
    }
}

export const getOrderByUserId  =async(userId:string)=>{
    try {
        const res = await axios.get(`${BASE_URL}/order/${userId}`)
        return res.data.orders
    } catch (error) {
        console.log("Order Error",error)
        return []
    }
}
