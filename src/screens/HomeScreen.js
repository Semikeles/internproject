import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, BackHandler, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import Header from '../components/Header';
import { colors } from '../config/Color';

const cards = [
  { id: '1', title: 'Crypto', icon: 'logo-bitcoin' },
  { id: '2', title: 'Nasdaq', icon: 'bar-chart' },
  { id: '3', title: 'Bist', icon: 'trending-up' },
  { id: '4', title: 'Gold', icon: 'cash' }, // Gold Card olarak değiştirildi
];

const { width, height } = Dimensions.get('window');

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

      <View style={styles.backgroundSymbolContainer} pointerEvents="none">
        <Text style={styles.backgroundSymbol}>₣</Text>
      </View>

      <Text style={styles.welcomeTitle}>Welcome User</Text>

      <View style={styles.grid}>
        {cards.map(card => (
          <Card
            key={card.id}
            title={card.title}
            icon={card.icon}
            onPress={() => {
              if (card.title === 'Crypto') {
                navigation.navigate('Crypto');
              } else if (card.title === 'Nasdaq') {
                navigation.navigate('Nasdaq');
              } else if (card.title === 'Bist') {
                navigation.navigate('Bist');
              } else if (card.title === 'Gold') {
                navigation.navigate('Gold'); // GoldScreen'e yönlendiriliyor
              }
            }}
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
    position: 'relative',
  },
  backgroundSymbolContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  backgroundSymbol: {
    fontSize: Math.min(width, height) * 1.5,
    color: '#0077cc',
    opacity: 0.07,
    fontWeight: '900',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#6c757d',
    textAlign: 'left',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    textTransform: 'capitalize',
    zIndex: 1,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
    zIndex: 1,
  },
});
