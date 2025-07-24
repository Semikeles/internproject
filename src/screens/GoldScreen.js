import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import GoldCard from '../components/GoldCard';
import { colors } from '../config/Color';

export default function GoldScreen({ navigation }) {
  return (
    <>
      <Header showBack={true} navigation={navigation} title="Gold Price" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginTop: 20 }}>
          <GoldCard />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
});
