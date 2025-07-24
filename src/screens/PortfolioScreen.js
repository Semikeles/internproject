import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../config/Color';

export default function PortfolioScreen() {
  const symbols = useSelector(state => state.portfolio.symbols);

  const getCurrency = (type) => {
    switch (type) {
      case 'crypto':
      case 'nasdaq':
        return 'USD';
      case 'bist':
      case 'gold':
      default:
        return 'TRY';
    }
  };

  const renderItem = ({ item }) => {
    const { symbol, type, quantity, price } = item;
    const total = quantity && price ? (quantity * price).toFixed(2) : null;
    const currency = getCurrency(type);

    return (
      <View style={styles.card}>
        <Text style={styles.symbol}>
          {symbol} ({type.toUpperCase()})
        </Text>
        <Text style={styles.detail}>Quantity: {quantity ?? 0}</Text>
        <Text style={styles.detail}>Unit Price: {price ? price.toFixed(2) : 0} {currency}</Text>
        <Text style={styles.total}>Total: {total ?? 0} {currency}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {symbols.length === 0 ? (
        <Text style={styles.emptyText}>Your portfolio is empty.</Text>
      ) : (
        <FlatList
          data={symbols}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.symbol}-${item.type}-${index}`}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  detail: {
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 4,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: colors.textSecondary,
  },
});
