import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import { fetchTrends } from '../utils/fetchTrends';
import { fetchProducts } from '../utils/fetchProducts';
import { Trend, Product } from '../types';

export default function App() {
  const [trends, setTrends] = useState<Trend[]>([]);  
  const [trendProducts, setTrendProducts] = useState<Map<number, Product[]>>(new Map());
  const [visibleProductIds, setVisibleProductIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchTrends().then(setTrends); 
  }, []);

  const toggleProductVisibility = (trendId: number) => {
    setVisibleProductIds(prev => {
      const newVisibleIds = new Set(prev);
      if (newVisibleIds.has(trendId)) {
        newVisibleIds.delete(trendId);
      } else {
        newVisibleIds.add(trendId);
      }
      return newVisibleIds;
    });
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <FlatList
        data={trends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                fetchProducts(item).then((products) => {
                  setTrendProducts(prevState => new Map(prevState).set(item.id, products));
                });
                toggleProductVisibility(item.id);
              }}
            >
              <Text style={styles.buttonText}>
                {visibleProductIds.has(item.id) ? 'Hide Products' : 'Show Products'}
              </Text>
            </TouchableOpacity>
            {visibleProductIds.has(item.id) && trendProducts.has(item.id) && (
              <FlatList
                data={trendProducts.get(item.id)}
                keyExtractor={(prod) => prod.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.productCard}>
                    <Text style={styles.productTitle}>{item.name}</Text>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <TouchableOpacity
                      style={styles.buyButton}
                      onPress={() => window.open(item.link)}
                    >
                      <Text style={styles.buyButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 10, 
    backgroundColor: '#F3E5F5', 
  },
  card: { 
    padding: 20, 
    marginTop: 20,
    marginBottom: 20, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    width: '100%', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#D81B60', 
  },
  description: { 
    fontSize: 16, 
    marginVertical: 10, 
    color: '#444', 
    lineHeight: 22,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#D81B60',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  productCard: { 
    marginTop: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  productTitle: {
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#333',
  },
  productImage: { 
    width: '100%', 
    height: 250, 
    borderRadius: 12, 
    marginBottom: 15, 
    resizeMode: 'cover',
  },
  buyButton: {
    paddingVertical: 12,
    backgroundColor: '#D81B60',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
