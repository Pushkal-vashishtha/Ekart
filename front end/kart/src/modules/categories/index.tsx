import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, ActivityIndicator, FlatList, 
  TouchableOpacity, Image 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { navigate } from "@navigation/NavigationUtil";

const API_URL = "http://192.168.1.11:3000/category"; // Update this if needed

// ✅ Define Category type
type Category = {
  _id: string;
  image_uri: string;
  name: string;
};

const Categories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Move fetchData outside useEffect
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const json = await response.json();
      console.log("API Response:", json);
      setData(json.data);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SafeAreaView />
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Explore our wide range of categories</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="black" style={styles.loader} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity onPress={() => fetchData()} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          numColumns={2}
          data={data}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>navigate('Products',{
              id:item._id,
              name:item.name,
              
            })}
            style={styles.itemContainer}>
              <Image source={{ uri: item.image_uri }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  title: { fontSize: RFValue(20), fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: RFValue(14), color: "#666", marginTop: 5 },
  headerContainer: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  name: { marginTop: 10, fontSize: RFValue(14), fontWeight: "600", color: "#333" },
  itemContainer: {
    flex: 1,
    margin: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  image: { width: 90, height: 90, borderRadius: 12 },
  errorContainer: { alignItems: "center", marginTop: 20 },
  errorText: { color: "red", textAlign: "center", fontSize: RFValue(14) },
  retryButton: { marginTop: 10, paddingVertical: 8, paddingHorizontal: 20, backgroundColor: "#FF3B30", borderRadius: 6 },
  retryText: { color: "white", fontWeight: "bold", fontSize: RFValue(14) },
  loader: { marginTop: 20 },
  listContainer: { paddingHorizontal: 10, paddingBottom: 20 },
});

export default Categories;
