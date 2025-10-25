import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { useProperty } from '../hooks/useProperty';

const HomeScreen = ({ navigation }) => {
  const { properties } = useProperty();

  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PropertyDetail', { property: item })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()} DT</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bienvenue</Text>
          <Text style={styles.headerSubtitle}>Trouvez votre bien immobilier</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dernières annonces</Text>
          <FlatList
            data={properties.slice(0, 5)}
            renderItem={renderPropertyCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#007AFF'
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5
  },
  section: {
    padding: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3
  },
  image: {
    width: '100%',
    height: 200
  },
  cardContent: {
    padding: 12
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5
  },
  location: {
    fontSize: 14,
    color: '#666'
  }
});

export default HomeScreen;
