import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Colors from '../config/Colors';

const avatar = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

export default function UserCard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(d => d.json())
      .then(u => {
        const usersAv = u.map(x => ({
          ...x,
          avatar: avatar,
        }));
        setUsers(usersAv);
      });
  }, []);

  return (
    <ScrollView>
      {users.map(user => (
        <View key={user.id} style={styles.card}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Phone: {user.phone}</Text>
          <Text>Website: {user.website}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.siyah,
    borderRadius: 8,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
  },
});
