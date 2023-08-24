import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useFetch } from "./useFetch";

const ProductDetailScreen: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const route = useRoute();
  const { url } = route.params;

  const { productData, loading, error } = useFetch(url);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const toggleFavorite = async () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    await AsyncStorage.setItem(url.toString(), newFavoriteStatus.toString());
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: productData.image }} style={styles.image} />
      <Text style={styles.title}>{productData.title}</Text>
      <Text style={styles.category}>{productData.category}</Text>
      <Text style={styles.description}>{productData.description}</Text>
      <Text style={styles.rating}>
        Rating: {productData.rating.rate} ({productData.rating.count} reviews)
      </Text>
      <Text style={styles.price}>${productData.price}</Text>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Text style={styles.favoriteButtonText}>{isFavorite ? "★" : "☆"}</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    marginBottom: 5,
    color: "#888",
  },
  description: {
    marginBottom: 10,
  },
  rating: {
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  favoriteButton: {
    backgroundColor: "#B59410",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  favoriteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  cartButton: {
    flex: 1,
    backgroundColor: "#4B0082",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  cartButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buyNowButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductDetailScreen;
