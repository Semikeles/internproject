import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addSymbol } from '../store/PortfolioSlice';
import { colors } from '../config/Color';

export default function CryptoCard({ symbol, pair = 'USDT', price }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('1');

  const total = () => {
    const qty = parseFloat(quantity);
    return !isNaN(qty) ? (qty * price).toFixed(2) : '0.00';
  };

  const handleAddToPortfolio = () => {
    const qty = parseFloat(quantity);
    if (!qty || qty <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity.');
      return;
    }

    dispatch(addSymbol({
      symbol,
      type: 'crypto',
      quantity: qty,
      price: price,
    }));

    Alert.alert('Success', `${symbol} added to portfolio.`);
    setQuantity('1');
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.symbol}>{symbol}/{pair}</Text>
        <TouchableOpacity onPress={handleAddToPortfolio}>
          <Ionicons name="cart-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>
        Price: {price !== null ? price.toFixed(2) : 'Loading...'} USD
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>Quantity:</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="0"
        />
      </View>

      <Text style={styles.total}>Total: {total()} USD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  price: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  label: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 8,
    minWidth: 80,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  total: {
    marginTop: 8,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});
