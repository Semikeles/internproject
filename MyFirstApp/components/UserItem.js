import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FetchExample() {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        setTodo(json);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text>Veri bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>ID: {todo.id}</Text>
      <Text>Başlık: {todo.title}</Text>
      <Text>Durum: {todo.completed ? 'Tamamlandı' : 'Tamamlanmadı'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
