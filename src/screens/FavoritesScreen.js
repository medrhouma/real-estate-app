import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';
import { useProperty } from '../hooks/useProperty';

const FavoritesScreen = ({ navigation }) => {
  const { properties, favorites, toggleFavorite } = useProperty();
  
  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  const renderFavoriteCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PropertyDetail', { property: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity
            onPress={() => {
              toggleFavorite(item.id);
              Alert.alert('Supprimé', 'Bien retiré des favoris');
            }}
          >
            <Text style={{ fontSize: 20 }}>❌</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>{item.price.toLocaleString()} DT</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {favoriteProperties.length > 0 ? (
        <FlatList
          data={favoriteProperties}
          renderItem={renderFavoriteCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Aucun favori pour l'instant</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5
  },
  location: {
    fontSize: 12,
    color: '#666'
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    color: '#999'
  }
});

export default FavoritesScreen;