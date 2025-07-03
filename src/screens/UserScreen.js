import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Header from '../components/Header';
import UserCard from '../components/UserCard'

export default function UserScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <UserCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
