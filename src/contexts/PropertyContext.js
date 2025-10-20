import React, { createContext, useState, useCallback } from 'react';

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([
    {
      id: '1',
      title: 'Bel Appartement à vendre',
      price: 150000,
      location: 'Tunis',
      type: 'apartment',
      rooms: 3,
      area: 120,
      image: 'https://via.placeholder.com/300x200',
      description: 'Bel appartement bien situé',
      latitude: 36.8065,
      longitude: 10.1815,
      isFavorite: false
    }
  ]);

  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 500000,
    type: 'all',
    location: ''
  });

  const addProperty = useCallback((property) => {
    setProperties([...properties, { ...property, id: Date.now().toString() }]);
  }, [properties]);

  const updateProperty = useCallback((id, updatedData) => {
    setProperties(properties.map(prop => 
      prop.id === id ? { ...prop, ...updatedData } : prop
    ));
  }, [properties]);

  const deleteProperty = useCallback((id) => {
    setProperties(properties.filter(prop => prop.id !== id));
  }, [properties]);

  const toggleFavorite = useCallback((propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      if (favorites.includes(propertyId)) {
        setFavorites(favorites.filter(id => id !== propertyId));
      } else {
        setFavorites([...favorites, propertyId]);
      }
    }
  }, [properties, favorites]);

  const getFilteredProperties = useCallback(() => {
    return properties.filter(property => {
      const priceMatch = property.price >= filters.minPrice && property.price <= filters.maxPrice;
      const typeMatch = filters.type === 'all' || property.type === filters.type;
      const locationMatch = property.location.toLowerCase().includes(filters.location.toLowerCase());
      return priceMatch && typeMatch && locationMatch;
    });
  }, [properties, filters]);

  const value = {
    properties,
    favorites,
    filters,
    setFilters,
    addProperty,
    updateProperty,
    deleteProperty,
    toggleFavorite,
    getFilteredProperties
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};