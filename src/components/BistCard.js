import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors } from '../config/Color';
import { useDispatch } from 'react-redux';
import { addSymbol } from '../store/PortfolioSlice';

export default function BistCard({ symbol, price }) {
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch();

  const handleQuantityChange = (text) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    setQuantity(cleaned);
  };

  const totalValue = () => {
    const qty = parseFloat(quantity);
    return !isNaN(qty) && price ? (qty * price).toFixed(2) : '0.00';
  };

  const handleStore = () => {
    const qty = parseFloat(quantity);
    if (!qty || qty <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity.');
      return;
    }

    dispatch(addSymbol({
      symbol,
      type: 'bist',
      quantity: qty,
      price,
    }));

    Alert.alert('Success', `${symbol} added to portfolio!`);
    setQuantity('');
  };

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.price}>
          {price && price !== 0 ? `${price.toFixed(2)} TRY` : 'No Data'}
        </Text>
      </View>

      <View style={styles.right}>
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="numeric"
        />
        <Text style={styles.totalText}>{totalValue()} TRY</Text>
        <TouchableOpacity style={styles.storeButton} onPress={handleStore}>
          <Text style={styles.storeButtonText}>Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  right: {
    alignItems: 'flex-end',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 80,
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 15,
    color: colors.textPrimary,
  },
  totalText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  storeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  storeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
