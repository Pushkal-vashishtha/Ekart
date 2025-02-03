import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { RouteProp } from "@react-navigation/native";
import SearchBar from "./atoms/SearchBar";
import { useAppSelector } from "@store/reduxHook";
import { selectTotalItemsInCart } from "@modules/cart/api/slice";
import UniversalAdd from "./atoms/UniversalAdd";

type Product = {
  _id: string;
  name: string;
  image_uri: string;
  price: number;
  description: string;
  category: string[];
};

type RouteParams = {
  id: string;
  name: string;
};

type ProductsScreenProps = {
  route: RouteProp<{ Products: RouteParams }, "Products">;
};

const Products: React.FC<ProductsScreenProps> = ({ route }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id: categoryId, name: categoryName } = route.params;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://192.168.1.11:3000/product/${categoryId}`);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const json = await response.json();
      setProducts(json.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("API Error:", error.message);
        setError(error.message);
      } else {
        console.error("Unknown API Error:", error);
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  const count = useAppSelector(selectTotalItemsInCart);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productContainer}>
      <Image source={{ uri: item.image_uri }} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.productDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.priceContainer}>
        <Text style={styles.productPrice}>₹{item.price + 599}</Text>
        <View style={styles.addButtonContainer}>
          <UniversalAdd item={item} />
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SafeAreaView />
        <Text style={styles.title}>{categoryName}</Text>
        <SearchBar cartLength={count}/>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="black" style={styles.loader} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity onPress={fetchProducts} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          key="grid" // Add this key prop
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: RFValue(14),
    color: "#666",
    marginTop: 5,
  },
  productContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: RFValue(14),
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: RFValue(10),
    fontWeight: "300",
    color: "#333",
    textAlign: "justify",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: "#2E8B57",
  },
  errorContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: RFValue(14),
  },
  retryButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#FF3B30",
    borderRadius: 6,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
    fontSize: RFValue(14),
  },
  loader: {
    marginTop: 20,
  },
  listContainer: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  priceContainer: {
    flexDirection: "row", // Align price and button horizontally
    alignItems: "center", // Keep them aligned properly
    justifyContent: "space-between", // Distribute space efficiently
    width: "100%", // Ensure full width
    marginTop: 8,
  },
  addButtonContainer: {
    marginLeft: 10, // Add some spacing between price and button
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});


export default Products;