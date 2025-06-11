import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ecoProducts = [
  {
    id: "1",
    name: "Bamboo Toothbrush",
    price: "$3.99",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZz4oC1mF_85ckE_nc87nzX53CAT6KA7qsw&s",
  },
  {
    id: "2",
    name: "Reusable Water Bottle",
    price: "$12.49",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDh9-qEEo5D00HOMcw7to48Cena57oMpDD7A&s",
  },
  {
    id: "3",
    name: "Cloth Shopping Bag",
    price: "$4.99",
    image: "https://cdn.shopify.com/s/files/1/0404/2041/files/Reusable_Eco-Friendly_Shopping_Bag_Types_The_Ultimate_Guide-b.jpg?v=1744977337",
  },
  {
    id: "4",
    name: "Compostable Plates (50 pcs)",
    price: "$9.95",
    image: "https://www.jiomart.com/images/product/original/rvi2rbsnui/kookoon-50-pcs-disposable-palm-leaf-plates-10-25cm-large-round-plates-eco-friendly-biodegradable-compostable-plates-like-wooden-plates-paper-plates-for-hot-food-side-plates-product-images-orvi2rbsnui-p605822867-0-202310261656.jpg?im=Resize=(420,420)",
  },
  {
    id: "5",
    name: "Organic Cotton Towel",
    price: "$14.99",
    image: "https://www.peacewiththewild.co.uk/wp-content/uploads/2023/08/ZWC-Tea-Towel-Olive-Green.jpg",
  },
];

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const itemWidth = screenWidth / numColumns - 24;

const Shop = () => {
  const renderItem = ({ item }: { item: typeof ecoProducts[0] }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛍️ Eco-Friendly Shop</Text>
      <FlatList
        data={ecoProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F5329",
    textAlign: "center",
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    marginHorizontal: 6,
    width: itemWidth,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  name: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  price: {
    fontSize: 13,
    color: "#555",
    marginVertical: 4,
  },
  button: {
    backgroundColor: "#0F5329",
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 6,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
});

export default Shop;
