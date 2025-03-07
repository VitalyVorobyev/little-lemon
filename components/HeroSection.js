import { Image, View, StyleSheet, Text, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default HeroSection = ({setSearchBarText, searchBarText}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heroTitle}>Little Lemon</Text>
      <View style={styles.heroSection}>
        <View style={styles.heroSectionLeft}>
          <Text style={styles.heroSubtitle}>Chicago</Text>
          <Text style={styles.heroText}>
            We are a family-owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
          </Text>
        </View>
        <View style={styles.heroSectionRight}>
          <Image
            source={require('../assets/Hero image.png')}
            style={styles.heroImage}
            accessibilityLabel="Restaurant Hero Dish"
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#495E57" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a dish..."
          placeholderTextColor="#495E57"
          onChangeText={setSearchBarText}
          value={searchBarText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#495E57",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 0,
    marginHorizontal: 0,
    marginTop: 10,
  },
  heroSection: {
    flexDirection: 'row'
  },
  heroSectionLeft: {
    flex: 0.65
  },
  heroSectionRight: {
    flex: 0.35
  },
  heroTitle: {
    fontSize: 42,
    fontFamily: "Markazi Text",
    fontWeight: "500",
    color: '#F4CE14',
  },
  heroSubtitle: {
    fontSize: 32,
    fontFamily: "Markazi Text",
    color: '#EDEFEE',
    marginBottom: 12,
    lineHeight: 34
  },
  heroText: {
    fontSize: 18,
    fontFamily: "Karla",
    color: 'white'
  },
  heroImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#EDEFEE',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#495E57",
  }
});
