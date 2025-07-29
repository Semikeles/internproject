import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { colors } from '../config/Color';
import app from '../config/firebaseConfig';

const db = getFirestore(app);
const auth = getAuth(app);

export default function EditProfileScreen() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || '');
            setSurname(data.surname || '');
          }
        } catch (err) {
          console.log('Error fetching user data:', err);
        }
      };
      fetchUserProfile();
    }
  }, [user]);

  const handleSave = async () => {
    if (!name || !surname) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      await setDoc(doc(db, 'users', user.uid), {
        name,
        surname,
      });
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (error) {
      console.log('Firestore error:', error);
      Alert.alert('Error', 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Your Profile</Text>

      <TextInput
        placeholder="First Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Last Name"
        value={surname}
        onChangeText={setSurname}
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 30,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    color: colors.textPrimary,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
