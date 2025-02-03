import { View, Text, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Alert } from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useAppSelector } from "@store/reduxHook";
import { selectCartItems, selectTotalCartPrice, selectTotalItemsInCart } from "../api/slice";
import LoginModal from "@modules/account/molecules/LoginModal";
import { createOrder, createTransaction } from "../api/paygateway";

const PlaceOrderButton = () => {

  const user = useAppSelector(state=> state.account.user) as any;
  const carts= useAppSelector(selectCartItems);

  const price = useAppSelector(selectTotalCartPrice)
  const items = useAppSelector(selectTotalItemsInCart)

  const [loading,setLoading] =useState(false)
  const [isVisible,setIsVisible] =useState(false)


  const handlePlaceOrder = async()=>{
    setLoading(true)
    const data = await createTransaction(price+items*599,user?._id)
    if(data){
      const order = await createOrder(data?.key,data?.amount,data?.order_id,carts,user?._id,user?.address)
      setLoading(false)
      if(order?.type==='error'){
        Alert.alert("payment failed")
      }
    }else{
      setLoading(false)
      Alert.alert("There was an Error")
    }

  }

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.strikePrice}>
          ₹{price+1200 +items*599}
          </Text>
          <Text style={styles.price}>
          ₹{price+items*599}
          </Text>
          <Text style={{fontSize:RFValue(10)}}>
            {" "}
          </Text>
        </View>
        <TouchableOpacity disabled={loading} style={styles.button} onPress={()=>{
          if(user){
            handlePlaceOrder()
          }else{
            setIsVisible(true)
          }
        }}>{
          loading? <ActivityIndicator color='black' size="small"/>
          : 
          <Text style={styles.btnText}>Place Order</Text>
        }</TouchableOpacity>
      </View>
      {isVisible && <LoginModal onClose={()=>setIsVisible(false)} visible={isVisible}/>}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFC201",
    padding: 10,
    borderRadius: 6,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  btnText: {
    color: "#222",
    fontWeight: "600",
    fontSize: RFValue(13),
  },

  strikePrice: {
    fontSize: RFValue(11), // Fixed incorrect bracket placement
    color: "#888",
    textDecorationLine: "line-through",
  },

  price: {
    fontSize: RFValue(16), // Removed invalid "A" character
    color: "#000",
    fontWeight: "600",
  },

  container: {
    position: "absolute",
    bottom: 0,
    borderTopWidth: 2,
    borderColor: "#F0F2F5", // Fixed typo "borderCotor"
    width: "100%",
    padding: 15,
    paddingBottom: Platform.OS === "ios" ? 30 : 10, // Fixed syntax for platform check
    flexDirection: "row", // Fixed incomplete string
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PlaceOrderButton;
