import { navigate } from "@navigation/NavigationUtil";
import { BASE_URL } from "@store/config"
import { useAppSelector } from "@store/reduxHook";
import axios from "axios"
import RazorpayCheckout from "react-native-razorpay";

export const createTransaction = async(amount:number,userId:string)=>{
    try {
        const res = await axios.post(`${BASE_URL}/order/transaction`,{
            userId,
            amount: (amount)*100  //rupee to paisa as razorpay understand in paisa 
        })
        return res.data
    } catch (error) {
        return null
    }
}

export const createOrder = async(
    key:string,
    amount:number,
    order_id:string,
    cart:any,
    userId:string,
    address:string
)=>{
    try {
        let options={
            description:"Ecommerce Shopping",
            image:'https://i.pinimg.com/736x/2b/35/a4/2b35a4763a31b6f5f40d9de9d7e05f88.jpg',
            currency:'INR',
            key:key,
            amount:amount*100,
            name:"Kart",
            order_id:order_id,
            theme:{
                color:'#53a20e'
            }

        }


        RazorpayCheckout.open(options).then(async(data)=>{
            const today = new Date();
            const sevenDaysFromNow = new Date();
            sevenDaysFromNow.setDate(today.getDate()+7);

            const res = await axios.post(`${BASE_URL}/order`,{
                razorpay_order_id:order_id,
                razorpay_payment_id: data?.razorpay_payment_id,
                razorpay_signature: data?.razorpay_signature,
                userId:userId,
                cartItems:cart,
                deliveryDate: sevenDaysFromNow.toISOString,
                address:address
            })

            navigate("PaymentSuccess",{
                price:amount/100,
                address:address
            })
        }).catch((error:any)=>{
            console.log(error)
            return {type:'error', message: error?.description}
        })
    } catch (error) {
        console.log("Error creating order:", error);
        return {type:'error', message:'Error'}
    }
}