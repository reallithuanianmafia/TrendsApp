import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Navbar from '../components/Navbar';
import { fetchTrends } from '../utils/fetchTrends';
import { fetchProducts } from '../utils/fetchProducts';
import { Trend, Product } from '../types';

export default function App() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [trendProducts, setTrendProducts] = useState<Map<number, Product[]>>(new Map());
  const [visibleProductIds, setVisibleProductIds] = useState<Set<number>>(new Set());
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fetchTrends().then(setTrends);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
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
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
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
                  <Animated.View style={[styles.productCard, { opacity: fadeAnim }]}>
                    <Text style={styles.productTitle}>{item.name}</Text>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <TouchableOpacity
                      style={styles.buyButton}
                      onPress={() => window.open(item.link)}
                    >
                      <Text style={styles.buyButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                  </Animated.View>
                )}
              />
            )}
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9E5E5',  // Soft gradient background (light pink)
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 10,
  },
  card: {
    marginTop: 30,
    padding: 25,
    backgroundColor: '#fff', // Clean white background
    borderRadius: 30, // Soft rounded corners for a luxurious feel
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    marginBottom: 20,
    borderColor: '#F3B8C0',
    borderWidth: 2,
    shadowColor: '#D81B60',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#D81B60',  // Deep pink to match the premium feel
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'AvenirNext-Bold',  // Custom high-end font
  },
  description: {
    fontSize: 18,
    color: '#7A4B6A',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 26,
    fontFamily: 'AvenirNext-Regular',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    backgroundColor: '#D81B60',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#F497B3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  productCard: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#F3B8C0',
    shadowColor: '#F3B8C0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#D81B60',  // Luxurious deep pink
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'AvenirNext-Bold',
  },
  productImage: {
    width: '100%',
    height: 280,
    borderRadius: 25,
    marginBottom: 20,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#F3B8C0', // Soft border to enhance the luxurious feeling
  },
  buyButton: {
    paddingVertical: 15,
    backgroundColor: '#D81B60',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    alignSelf: 'center',
    shadowColor: '#D81B60',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
  },
  buyButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
});
