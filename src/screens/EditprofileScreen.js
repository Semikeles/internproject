import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/Color';

export default function EditProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is where you can edit your profile information.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
