import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useAppSelector } from '@store/reduxHook'
import { getOrderByUserId } from './api/api'
import { orderStyles } from '@styles/orderStyles'
import CustomSafeAreaView from '@components/atoms/CustomSafeAreaView'
import { RFValue } from 'react-native-responsive-fontsize'
import { navigate } from '@navigation/NavigationUtil'
import LoginModal from './molecules/LoginModal'
import { formatDate } from '@utils/Constants'

// 
const Account = () => {
  const route = useRoute()
  const item = route?.params as any
  const user = useAppSelector(state => state.account.user) as any
  const [orders, setOrders] = useState<any[]>([])
  const [visible, setIsVisbile] = useState(false)

  const fetchOrder = async () => {
    const data = await getOrderByUserId(user?._id)
    if (data) {
      setOrders(data)
    }
  }

  useEffect(() => {
    if (user) {
      fetchOrder()
    } else {
      setOrders([])
    }
  }, [user])

  useEffect(() => {
    if (item?.isRefresh && user) {
      fetchOrder()
    }
  }, [item])

  const renderOrderItem = ({ item }: any) => (
    <View style={orderStyles.orderContainer}>
      <Image source={{uri: item?.product?.image_uri}} style={orderStyles.image}/>
      <View style={orderStyles.orderDetails}>
        <Text style={orderStyles.itemName}>{`${item.quantity}X ${item?.product?.name}`}</Text>
        <Text style={orderStyles.price}>
          {item?.product?.price}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <CustomSafeAreaView>
        <View style={orderStyles.container}>
          <Text style={orderStyles.heading}>
            {user?.phone ? user?.phone : 'Account'}
          </Text>
          <View style={orderStyles.flexRow}>
            <Text style={orderStyles.subHeading}>
              {user?.address ? user?.address : 'Deliver to: Login first to see your orders'}
            </Text>
          </View>
          <TouchableOpacity style={orderStyles.btn} onPress={() => setIsVisbile(true)}>
            <Text style={orderStyles.btnText}>{user ? 'Update' : 'Login'}</Text>
          </TouchableOpacity>
        </View>

        <View style={orderStyles.container}>
          <Text style={orderStyles.heading}>Your Orders</Text>
          <FlatList
            data={orders}
            keyExtractor={(item) => item?._id?.toString()}
            renderItem={({ item }) => (
              <View style={orderStyles.order}>
                <FlatList
                  data={item?.items}
                  keyExtractor={(subItem, index) => index.toString()}
                  renderItem={renderOrderItem} // Fixed function reference
                  scrollEnabled={false}
                />
                <Text style={orderStyles.address}>{item?.address}</Text>
                <Text style={orderStyles.deliveryDate}>
                  Delivery by: {formatDate(item?.deliveryDate)}
                </Text>
                <View style={orderStyles.statusContainer}>
                  <Text style={orderStyles.statusText}>{item?.status}</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View>
                <Text style={orderStyles.emptyText}>
                  {!user ? 'Login to place orders' : 'There are no orders you placed'}
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </CustomSafeAreaView>

      <LoginModal onClose={() => setIsVisbile(false)} visible={visible} />
    </>
  )
}

export default Account
