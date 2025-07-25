// UserScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../config/Color';
import { auth } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function UserScreen() {
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => console.log('Logged out'))
      .catch(err => {
        console.log(err);
        Alert.alert('Error', 'Logout failed');
      });
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={80} color={colors.primary} />

      <Text style={styles.username}>Durmuş Semih Keleş</Text>

      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Ionicons name="create-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    color: colors.textPrimary,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});
