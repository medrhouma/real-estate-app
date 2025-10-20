import React, { createContext, useState, useCallback } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const updateProfile = useCallback((profileData) => {
    setUserProfile(profileData);
  }, []);

  const sendMessage = useCallback((receiverId, content) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      receiverId,
      content,
      timestamp: new Date(),
      read: false
    };
    setMessages([...messages, newMessage]);
  }, [messages]);

  const addNotification = useCallback((notification) => {
    setNotifications([...notifications, {
      id: Date.now().toString(),
      ...notification,
      timestamp: new Date(),
      read: false
    }]);
  }, [notifications]);

  const markNotificationAsRead = useCallback((notificationId) => {
    setNotifications(notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  }, [notifications]);

  const value = {
    userProfile,
    updateProfile,
    messages,
    sendMessage,
    notifications,
    addNotification,
    markNotificationAsRead
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};