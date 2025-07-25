// GoldScreen.js
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import GoldCard from '../components/GoldCard';
import { colors } from '../config/Color';

export default function GoldScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: 20 }}>
          <GoldCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 16,
    flexGrow: 1,
  },
});
