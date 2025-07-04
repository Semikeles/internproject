import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { colors } from '../config/Color';

export default function NasdaqScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.text}>Nasdaq Screen - Buraya içerik gelecek</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.textPrimary,
    fontSize: 24,
  },
});
