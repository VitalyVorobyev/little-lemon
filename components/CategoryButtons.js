import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default CategoryButtons = ({ onChange, filterSelections, sections }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
      >
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.categoryButton,
                  filterSelections[index] && styles.categoryButtonPressed]}
          onPress={() => {onChange(index);}}
        >
          <Text style={styles.categoryButtonText}>
            {section}
          </Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,  // Optional: Adds padding to the scroll area
  },
  categoryButton: {
    backgroundColor: "#EDEFEE",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryButtonText: {
    fontWeight: "bold",
    color: "#495E57",
  },
  categoryButtonPressed: {
    backgroundColor: "#F4CE14"
  }
});

