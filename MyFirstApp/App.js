import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';

export default function App() {
  const [anaRenk, setAnaRenk] = useState('#ffffff');
  const [guncelKaynak, setGuncelKaynak] = useState('posts');

  useEffect(() => {
    if (guncelKaynak === 'posts') {
      setAnaRenk('#FFC0CB');
    } else if (guncelKaynak === 'photos') {
      setAnaRenk('#40E0D0');
    } else if (guncelKaynak === 'users') {
      setAnaRenk('#FFA500');
    } else {
      setAnaRenk('#ffffff');
    }
  }, [guncelKaynak]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: anaRenk,
        justifyContent: 'center',    // Dikey ortala
        alignItems: 'center',        // Yatay ortala
        padding: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '80%',             // Butonların genişliği için
          marginBottom: 20,
        }}
      >
        <Button title="Posts" onPress={() => setGuncelKaynak('posts')} />
        <Button title="Photos" onPress={() => setGuncelKaynak('photos')} />
        <Button title="Users" onPress={() => setGuncelKaynak('users')} />
      </View>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>{guncelKaynak}</Text>
    </View>
  );
}
