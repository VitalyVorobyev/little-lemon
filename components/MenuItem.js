import { Image, View, Text, StyleSheet } from 'react-native';

const get_image_url = (name) => `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${name}?raw=true`

export default MenuItem = ({ item }) => {
  return (
    <View style={styles.menuItem}>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{item.name}</Text>
        <Text style={styles.menuDescription} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
        <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Image
        source={{uri: get_image_url(item.image)}}
        style={styles.menuImage}
        accessibilityLabel={`${item.name} image`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  menuTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuDescription: {
    fontSize: 16,
    fontFamily: "Karla",
    lineHeight: 24,
    color: '#495E57',
    marginVertical: 8
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: '#495E57'
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  }
});
