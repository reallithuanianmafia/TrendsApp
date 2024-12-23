import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Button, StyleSheet, Text } from 'react-native';
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
            <Button
              title={visibleProductIds.has(item.id) ? 'Hide Products' : 'Show Products'}
              onPress={() => {
                fetchProducts(item).then((products) => {
                  setTrendProducts(prevState => new Map(prevState).set(item.id, products));
                });
                toggleProductVisibility(item.id);
              }}
              color="#D81B60"
            />
            {visibleProductIds.has(item.id) && trendProducts.has(item.id) && (
              <FlatList
                data={trendProducts.get(item.id)}
                keyExtractor={(prod) => prod.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.productCard}>
                    <Text style={styles.productTitle}>{item.name}</Text>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <Button title="Buy Now" onPress={() => window.open(item.link)} color="#D81B60" />
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
    backgroundColor: '#F8BBD0', 
    margin: 0,
  },
  card: { 
    padding: 20, 
    marginBottom: 15, 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    width: '100%', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#D81B60', 
  },
  description: { 
    fontSize: 14, 
    marginVertical: 10, 
    color: '#333', 
  },
  productCard: { 
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productTitle: {
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    color: '#333',
  },
  productImage: { 
    width: '100%', 
    height: 200, 
    borderRadius: 10, 
    marginBottom: 15, 
  },
});
