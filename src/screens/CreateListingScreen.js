import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import { useProperty } from '../hooks/useProperty';

const CreateListingScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [rooms, setRooms] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('apartment');

  const { addProperty } = useProperty();

  const handlePublish = () => {
    if (!title || !price || !location) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newProperty = {
      title,
      price: parseInt(price),
      location,
      rooms: parseInt(rooms) || 1,
      area: parseInt(area) || 0,
      description,
      type,
      image: 'https://via.placeholder.com/300x200'
    };

    addProperty(newProperty);
    Alert.alert('Succès', 'Annonce publiée avec succès!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Publier une annonce</Text>

        <TextInput
          style={styles.input}
          placeholder="Titre de l'annonce *"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Prix (DT) *"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TextInput
          style={styles.input}
          placeholder="Localisation *"
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre de chambres"
          keyboardType="numeric"
          value={rooms}
          onChangeText={setRooms}
        />

        <TextInput
          style={styles.input}
          placeholder="Surface (m²)"
          keyboardType="numeric"
          value={area}
          onChangeText={setArea}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.typeSection}>
          <Text style={styles.label}>Type de bien</Text>
          <View style={styles.typeButtons}>
            {['apartment', 'house', 'land'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.typeButton,
                  type === t && styles.typeButtonActive
                ]}
                onPress={() => setType(t)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    type === t && styles.typeButtonTextActive
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.publishButton}
          onPress={handlePublish}
        >
          <Text style={styles.publishButtonText}>Publier l'annonce</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 12
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10
  },
  typeSection: {
    marginBottom: 20
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  typeButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  typeButtonText: {
    color: '#666',
    fontSize: 14
  },
  typeButtonTextActive: {
    color: '#fff'
  },
  publishButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CreateListingScreen;