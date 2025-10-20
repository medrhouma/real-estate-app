import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native';
import { useProperty } from '../hooks/useProperty';

const PropertyDetailScreen = ({ route, navigation }) => {
  const { property } = route.params;
  const { toggleFavorite, favorites } = useProperty();
  const isFavorite = favorites.includes(property.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: property.image }} style={styles.mainImage} />
        
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{property.title}</Text>
            <TouchableOpacity
              onPress={() => toggleFavorite(property.id)}
              style={styles.favoriteButton}
            >
              <Text style={{ fontSize: 24 }}>
                {isFavorite ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>{property.price.toLocaleString()} DT</Text>
          <Text style={styles.location}>📍 {property.location}</Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Chambres</Text>
              <Text style={styles.detailValue}>{property.rooms}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Surface</Text>
              <Text style={styles.detailValue}>{property.area}m²</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>{property.type}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>

          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contacter le vendeur</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  mainImage: {
    width: '100%',
    height: 300
  },
  content: {
    padding: 15,
    backgroundColor: '#fff'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1
  },
  favoriteButton: {
    padding: 10
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 15
  },
  detailItem: {
    alignItems: 'center'
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20
  },
  contactButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default PropertyDetailScreen;