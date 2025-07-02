import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";

const icon = require('../../assets/icon.png');



export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    if (form.email.length === 0 || form.password.length === 0) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    
    if (form.email === 'csb@gmail.com' && form.password === '123456') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Hata', 'Email veya şifre yanlış');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2c3e50' }}>

      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={icon} style={styles.headerImg} />
        </View>

        <Text style={styles.title}>Welcome</Text>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>    
            <TextInput 
              style={styles.inputControl}
              placeholder="csb@example.com"
              placeholderTextColor='#6b7280'
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={email => setForm({...form, email})}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>    
            <TextInput 
              secureTextEntry
              style={styles.inputControl}
              placeholder="***************"
              placeholderTextColor='#6b7280'
              value={form.password}
              onChangeText={password => setForm({...form, password})}
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
    color: 'white',
    fontSize: 27,
    fontWeight: '700', 
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    marginTop: 10,
  },
  input: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  button: {
    backgroundColor: '#40E0D0',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
