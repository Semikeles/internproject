// CryptoScreen.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import CryptoCard from '../components/CryptoCard';
import { colors } from '../config/Color';
const POPULAR_CRYPTO_SYMBOLS = [ 'BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOT', 'DOGE', 'MATIC', 'LTC', 'SHIB', 'TRX', 'AVAX', 'UNI', 'WBTC', 'LINK', 'ALGO', 'ATOM', 'XLM', 'FTT', 'VET', 'ICP', 'AXS', 'FIL', 'THETA', 'XMR', 'EOS', 'CRO', 'AAVE', 'NEAR', 'KSM', 'MKR', 'CAKE', 'QNT', 'ZEC', 'SAND', 'LUNA', 'ENJ', 'BCH', 'CHZ', 'XTZ', 'BAT', 'GRT', 'MANA', 'COMP', 'DASH', 'YFI', 'ZIL', 'KLAY', 'CELO', 'RVN', 'OMG', 'DCR', '1INCH', 'FTM', 'HNT', 'KNC', 'WAVES', 'GLM', 'STX', 'NEXO', 'AR', 'LRC', 'SUSHI', 'ZRX', 'REN', 'BAL', 'CRV', 'NKN', 'UST', 'CEL', 'BTG', 'ANKR', 'SXP', 'HUSD', 'CHSB', 'GNO', 'OCEAN', 'CVC', 'BNT', 'SRM', 'NMR', 'KAVA' ];

const UNIQUE_SYMBOLS = [...new Set(POPULAR_CRYPTO_SYMBOLS)];

export default function CryptoScreen() {
  const [prices, setPrices] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const promises = UNIQUE_SYMBOLS.map(symbol =>
          fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`)
            .then(res => res.json())
            .then(data => ({ symbol, price: parseFloat(data.price) || 0 }))
            .catch(() => ({ symbol, price: 0 }))
        );

        const results = await Promise.all(promises);
        setPrices(results);

        setQuantities(prev => {
          const newQty = { ...prev };
          results.forEach(({ symbol }) => {
            if (!(symbol in newQty)) newQty[symbol] = '0';
          });
          return newQty;
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  const handleQuantityChange = (symbol, value) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setQuantities(prev => ({ ...prev, [symbol]: value }));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {prices.map(({ symbol, price }) => {
            const quantity = quantities[symbol] || '0';
            const total = (parseFloat(quantity) || 0) * price;

            return (
              <View key={symbol} style={styles.card}>
                <CryptoCard symbol={symbol} price={price} />
                <View style={styles.row}>
                  <Text style={styles.label}>Quantity:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    value={quantity}
                    onChangeText={v => handleQuantityChange(symbol, v)}
                  />
                </View>
                <Text style={styles.total}>Total: {total.toFixed(2)} USD</Text>
              </View>
            );
          })}
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
  container: {
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
    color: colors.textPrimary,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 8,
    color: colors.textPrimary,
  },
  total: {
    marginTop: 8,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});
