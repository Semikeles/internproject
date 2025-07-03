import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const avatarPlaceholder = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';

export default function UserCard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(async (data) => {
        const genderAgeResponse = await fetch(`https://randomuser.me/api/?results=${data.length}`);
        const genderAgeData = await genderAgeResponse.json();

        const updatedUsers = data.map((user, index) => {
          const randomUser = genderAgeData.results[index];
          
          // Yaş hesaplama
          const dob = new Date(randomUser.dob.date);
          const ageDifMs = Date.now() - dob.getTime();
          const ageDate = new Date(ageDifMs);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);

          return {
            ...user,
            avatar: randomUser.picture?.medium || avatarPlaceholder,
            gender: randomUser.gender === 'male' ? 'Male' : 'Female',
            age: age,
          };
        });

        setUsers(updatedUsers);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.list}>
      <Text style={styles.title}>List</Text>
      {users.map(user => (
        <View key={user.id} style={styles.card}>
          <View style={styles.header}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.headerText}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.subText}>{user.age} y.o. / {user.gender}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{user.age} y.o.</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Website:</Text>
            <Text style={styles.value}>{user.website}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0c8b6',
  },
  headerText: {
    marginLeft: 18,
  },
  name: {
    fontSize: 20,
    fontWeight: '900',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 100,
    fontWeight: '700',
    color: '#333',
  },
  value: {
    color: '#555',
    fontWeight: '500',
  },
});
