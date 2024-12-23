import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Navbar: React.FC = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.menuButton}>
      </TouchableOpacity>
      <Text style={styles.navbarText}>What's Trending</Text>
      <View style={styles.rightSide}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 0,
    margin: 0,
    backgroundColor: '#D5006D',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  navbarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 10,
  },
  rightSide: {
    width: 30,
  },
});

export default Navbar;
