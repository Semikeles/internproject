import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../config/Color';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>Durmuş Semih Keleş</Text>
      <Text style={styles.info}>durmussemihkeles@gmail.com</Text>
      <Text style={styles.info}>+90 534 395 17 52</Text>
      <Text style={styles.info}>Age: 21</Text>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="create-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: colors.surface,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
