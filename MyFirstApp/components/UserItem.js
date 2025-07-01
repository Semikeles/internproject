import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function UserItem({ user }) {
  return (
    <Text style={styles.item}>
      {user.name} - {user.email}
    </Text>
  );
}

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
});
