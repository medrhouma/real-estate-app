import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image
} from 'react-native';

const MessagesScreen = () => {
  const [conversations, setConversations] = useState([
    {
      id: '1',
      name: 'Ahmed Ben Ali',
      lastMessage: 'Oui, je peux visiter demain',
      avatar: 'https://via.placeholder.com/50',
      unread: 2,
      timestamp: '14:30'
    },
    {
      id: '2',
      name: 'Fatima Kadi',
      lastMessage: 'Quel est le prix final?',
      avatar: 'https://via.placeholder.com/50',
      unread: 0,
      timestamp: '10:15'
    }
  ]);

  const renderConversation = ({ item }) => (
    <TouchableOpacity style={styles.conversationItem}>
      <Image
        source={{ uri: item.avatar }}
        style={styles.avatar}
      />
      <View style={styles.conversationContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Chercher une conversation..."
        />
      </View>
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14
  },
  conversationItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  conversationContent: {
    flex: 1
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  message: {
    fontSize: 13,
    color: '#666'
  },
  meta: {
    alignItems: 'flex-end'
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

export default MessagesScreen;