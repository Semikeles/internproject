import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import { colors } from '../config/Color';
const icon = require('../../assets/icon.png');

// ✅ Firebase import
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    const { email, password } = loginForm;

    if (email.length === 0 || password.length === 0) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Login Success:', userCredential.user.email);
        navigation.replace('MainTabs');
      })
      .catch((error) => {
        console.log('Login Error:', error);
        Alert.alert('Hata', 'Email veya şifre yanlış');
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={icon} style={styles.headerImg} />
        </View>

        <Text style={styles.title}>Welcome</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              style={styles.inputControl}
              placeholder="you@example.com"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={loginForm.email}
              onChangeText={email => setLoginForm({ ...loginForm, email })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="***************"
              placeholderTextColor={colors.textSecondary}
              value={loginForm.password}
              onChangeText={password => setLoginForm({ ...loginForm, password })}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginVertical: 36,
    alignItems: 'center',
  },
  headerImg: {
    width: 80,
    height: 80,
    marginBottom: 36,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontFamily: 'Sora_700Bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Sora_600SemiBold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 15,
    fontFamily: 'Sora_400Regular',
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: 'Sora_600SemiBold',
  },
});
