import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import Header from '../components/Header';
import NasdaqCard from '../components/NasdaqCard';
import { colors } from '../config/Color';

const API_KEY = 'd1jreq9r01qvg5h0brrgd1jreq9r01qvg5h0brs0';

const POPULAR_SYMBOLS = [
  'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META',
  'TSLA', 'NVDA', 'NFLX', 'BRK.B', 'JPM',
  'V', 'DIS', 'PYPL', 'ADBE', 'INTC',
  'CSCO', 'CRM', 'KO', 'PFE', 'XOM',
  'ORCL', 'T', 'PEP', 'COST', 'ABNB',
  'AMD', 'BIDU', 'SHOP', 'ZM', 'UBER',
  'LYFT', 'TWTR', 'SQ', 'ROKU', 'DOCU',
  'SNAP', 'SPOT', 'PLTR', 'SNOW', 'MRNA',
  'BA', 'NKE', 'WMT', 'HD', 'LOW',
  'CVX', 'MCD', 'SBUX', 'TGT', 'PG',
  'JNJ', 'UNH', 'DHR', 'AVGO', 'TXN'
];

// Noktalı sembollerde nokta yerine tire koyar (BRK.B => BRK-B)
const sanitizeSymbol = (symbol) => symbol.replace('.', '-');

export default function NasdaqScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const promises = POPULAR_SYMBOLS.map(symbol => {
          const apiSymbol = sanitizeSymbol(symbol);
          return fetch(`https://finnhub.io/api/v1/quote?symbol=${apiSymbol}&token=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
              // Konsolda kontrol için
              console.log(`API response for ${symbol} (sent as ${apiSymbol}):`, data);
              return {
                symbol,
                price: data.c ?? 0,
              };
            });
        });

        const results = await Promise.all(promises);
        setPrices(results);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const filtered = prices.filter(item =>
    item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Header
        showBack={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        filtered.map(item => (
          <NasdaqCard
            key={item.symbol}
            symbol={item.symbol}
            unitPrice={item.price}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingTop: 12,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
  },
});
