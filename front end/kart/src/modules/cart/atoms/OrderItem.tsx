import { View, Text, StyleSheet, Image } from "react-native";
import React, { FC } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import UniversalAdd from "@modules/products/atoms/UniversalAdd";

const OrderItem: FC<{ item: any }> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image_uri }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.price+599}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <UniversalAdd item={item}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  image: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: 6,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: RFValue(14),
    fontWeight: "600",
    color: "#333",
  },
  price: {
    fontSize: RFValue(12),
    fontWeight: "500",
    color: "#2E8B57",
    marginTop: 4,
  },
  quantity: {
    fontSize: RFValue(12),
    color: "#666",
    marginTop: 2,
  },
});

export default OrderItem;
