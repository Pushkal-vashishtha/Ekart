import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import CustomSafeAreaView from '@components/atoms/CustomSafeAreaView'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAppSelector } from '@store/reduxHook'
import { selectCartItems } from './api/slice'
import { navigate } from '@navigation/NavigationUtil'
import OrderItem from './atoms/OrderItem'
import PlaceOrderButton from './atoms/PlaceOrderButton'

const Cart = () => {

  const carts = useAppSelector(selectCartItems);
  const user = useAppSelector(state => state.account.user)as any;

  useEffect(() => {
    console.log("User data updated:", user);
}, [user]);

  const renderItem = ({item}:any)=>(
    < OrderItem item={item}/>
  )

  return (
   <CustomSafeAreaView>
    <View style={styles.container}>
      <Text style={styles.heading}>My Cart</Text>
      <Text style={styles.number}>{user?.phone ? user?.phone:'🛒'}</Text>
      <Text style={styles.address}>Deliver to:{user?.address? user?.address :'Login first to place your order'}</Text>

    </View>

    {
      carts.length >0 ?(
        <FlatList 
        data={carts}
        renderItem={renderItem}
        keyExtractor={(item)=>item._id.toString()}
        contentContainerStyle={styles.listContainer}
        />
      ):
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity style={styles.showButton} onPress={()=>navigate('Categories')}>
          <Text style={styles.ShopNowText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    }

    {carts.length > 0 && <PlaceOrderButton/>}
   </CustomSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 5,
    borderColor: "#F0F2F5",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: RFValue(16),
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  address: {
    color: "#666",
    marginTop: 3,
    fontSize: RFValue(12),
  },
  number: {
    fontWeight: "500",
    fontSize: RFValue(18),
    color: "#000",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 50,
  },
  emptyText: {
    fontSize: RFValue(14),
    fontWeight: "500",
    color: "#666",
    marginBottom: 10,
  },
  showButton: {
    backgroundColor: "#2E8B57",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  ShopNowText: {
    color: "#fff",
    fontSize: RFValue(14),
    fontWeight: "600",
  },
});




export default Cart