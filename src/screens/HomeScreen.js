import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import Header from '../components/Header';
import { colors } from '../config/Color';

const cards = [
  { id: '1', title: 'Kripto', icon: 'logo-bitcoin' },
  { id: '2', title: 'Nasdaq', icon: 'bar-chart' },
  { id: '3', title: 'Bist', icon: 'trending-up' },
  { id: '4', title: 'Emtia', icon: 'cash' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Login');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBack={true} />
      <View style={styles.grid}>
        {cards.map(card => (
          <Card
            key={card.id}
            title={card.title}
            icon={card.icon}
            onPress={
              card.title === 'Nasdaq'
                ? () => navigation.navigate('Nasdaq')
                : undefined
            }
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
    marginTop: 20,
  },
});
