import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import { useProperty } from '../hooks/useProperty';

const PropertyListScreen = ({ navigation }) => {
  const { properties, filters, setFilters, getFilteredProperties } = useProperty();
  const [searchText, setSearchText] = useState('');

  const filteredProperties = getFilteredProperties();

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PropertyDetail', { property: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()} DT</Text>
        <Text style={styles.details}>{item.rooms} chambres • {item.area}m²</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Chercher une localisation..."
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            handleFilterChange('location', text);
          }}
        />
        
        <View style={styles.filterRow}>
          <TextInput
            style={styles.filterInput}
            placeholder="Prix min"
            keyboardType="numeric"
            onChangeText={(text) => handleFilterChange('minPrice', parseInt(text) || 0)}
          />
          <TextInput
            style={styles.filterInput}
            placeholder="Prix max"
            keyboardType="numeric"
            onChangeText={(text) => handleFilterChange('maxPrice', parseInt(text) || 500000)}
          />
        </View>
      </View>

      <FlatList
        data={filteredProperties}
        renderItem={renderPropertyCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  filterSection: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 5,
    fontSize: 14
  },
  listContent: {
    padding: 10
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 2
  },
  image: {
    width: '100%',
    height: 200
  },
  cardContent: {
    padding: 12
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5
  },
  details: {
    fontSize: 12,
    color: '#666'
  }
});

export default PropertyListScreen;