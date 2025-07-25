import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import Card from '../components/Card';
import Header from '../components/Header'; // Header'ı ekledik
import { colors } from '../config/Color';

const cards = [
  { id: '1', title: 'Crypto', icon: 'logo-bitcoin' },
  { id: '2', title: 'Nasdaq', icon: 'bar-chart' },
  { id: '3', title: 'Bist', icon: 'trending-up' },
  { id: '4', title: 'Gold', icon: 'cash' },
];

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" showBack={false} /> {/* Başlık ve geri buton kontrolü */}

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
            onPress={() => navigation.navigate(card.title)}
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
