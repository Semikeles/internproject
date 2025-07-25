import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
} from 'react-native';
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

export default function NasdaqScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const promises = POPULAR_SYMBOLS.map(symbol =>
          fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
            .then(res => res.json())
            .then(data => ({ symbol, price: data.c || 0 }))
        );
        const results = await Promise.all(promises);
        setPrices(results);
      } catch (err) {
        console.error(err);
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
    <SafeAreaView style={styles.safe}>
      <TextInput
        placeholder="Search..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={colors.textSecondary}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {filtered.map(item => (
            <NasdaqCard key={item.symbol} symbol={item.symbol} unitPrice={item.price} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 8,
    margin: 16,
    color: colors.textPrimary,
  },
  container: {
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
