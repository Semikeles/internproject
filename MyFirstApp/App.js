import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';

export default function App() {
  const [resourceType, setResourceType] = useState('posts');

  useEffect(() => {
    console.log('Yükleme:', resourceType);
  }, [resourceType]);

  return (
    <View style={{ padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <Button title="Posts" onPress={() => setResourceType('posts')} />
        <Button title="Photos" onPress={() => setResourceType('photos')} />
        <Button title="Users" onPress={() => setResourceType('users')} />
      </View>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>{resourceType}</Text>
    </View>
  );
}
