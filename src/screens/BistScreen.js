// BistScreen.js
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { colors } from '../config/Color';
import Header from '../components/Header';
import BistCard from '../components/BistCard';

const POPULAR_BIST_SYMBOLS = [
  'ACSEL', 'ADANA', 'AKBNK', 'ASELS', 'THYAO', 'SISE', 'KCHOL',
  'TOASO', 'EREGL', 'BIMAS', 'PETKM', 'TUPRS',
  'SAHOL', 'ARCLK', 'YKBNK', 'HALKB', 'ISCTR',
  'PGSUS', 'GARAN', 'VESTL', 'TCELL', 'AKSEN',
  'ENKAI', 'DOAS', 'ISFIN', 'ALARK', 'TTKOM',
  'ODAS', 'KORDS', 'KOZAL', 'KOZAA', 'OYAKC',
  'BRISA', 'ANACM', 'TRKCM', 'SODA', 'ENJSA',
  'AEFES', 'CCOLA', 'TAVHL', 'ULKER', 'FROTO',
  'SOKM', 'MGROS', 'AKGRT', 'VAKBN', 'TURSG',
  'ZOREN', 'EKGYO', 'ISGYO', 'SNGYO', 'TSKB'
];

export default function BistScreen() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  const API_KEY = '6U3eA1XrlhTOxu11gMV7gL:4Ucs5GQtObojNQKqErLEBe';

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.collectapi.com/economy/liveBorsa', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `apikey ${API_KEY}`,
          },
        });

        const data = await response.json();
        if (data.success && Array.isArray(data.result)) {
          const pricesObj = {};
          for (const symbol of POPULAR_BIST_SYMBOLS) {
            const stock = data.result.find(item => item.name === symbol);
            pricesObj[symbol] = stock ? stock.price : 0;
          }
          setPrices(pricesObj);
        } else {
          setPrices({});
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setPrices({});
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header showBack={true} />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        POPULAR_BIST_SYMBOLS.map(symbol => (
          <BistCard
            key={symbol}
            symbol={symbol}
            price={prices[symbol]}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    paddingTop: 12,
    backgroundColor: colors.background,
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
  },
});
