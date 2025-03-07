import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import debounce from 'lodash.debounce';

import HeroSection from '../components/HeroSection';
import MenuItem from '../components/MenuItem';
import CategoryButtons from '../components/CategoryButtons';
import * as Database from '../components/Database';

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

const fetchData = async() => {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json.menu;
  } catch (e) {
    Alert.alert(e.message);
  }
  return [];
}

const sections = ['Starters', 'Mains', 'Desserts', 'Drinks'];

export default HomeScreen = ({navigation}) => {
  const [initialized, setInitialized] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [query, setQuery] = useState('');
  const [searchBarText, setSearchBarText] = useState('');
  const [filterSelections, setFilterSelections] = useState(sections.map(() => false));

  useEffect(() => {
    (async () => {
      try {
        await Database.createTable();
        let savedMenuItems = await Database.getMenuItems();
        if (!savedMenuItems || !savedMenuItems.length) {
          Alert.alert('No data in database');
          savedMenuItems = await fetchData();
          await Database.saveMenuItems(savedMenuItems);
        }
        setMenuItems(savedMenuItems);
        setInitialized(true);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (!initialized) return;
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const filteredMenuItems = await Database.filterByQueryAndCategories(
          query,
          activeCategories
        );
        setMenuItems(filteredMenuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query, initialized]);

  const lookup = useCallback((q) => setQuery(q), []);
  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <View style={styles.container}>
      <HeroSection
        setSearchBarText={handleSearchChange}
        searchBarText={searchBarText}
      />
      <Text style={styles.orderTitle}>
        Order for delivery!
      </Text>
      <CategoryButtons
        onChange={handleFiltersChange}
        sections={sections}
        filterSelections={filterSelections}
      />
      <View style={styles.separator} />
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <MenuItem item={item} />}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  orderTitle: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  separator: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#ccc", // Light gray color for the line
    width: "100%",
  },
});
