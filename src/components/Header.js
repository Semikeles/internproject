// Header.js

import Colors from '../config/Colors';

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header({ navigation, title = 'Users' }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40, // StatusBar için boşluk
    paddingHorizontal: 16,
    backgroundColor: '#40E0D0',
    height: 80,
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});

