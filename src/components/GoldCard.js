import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addSymbol } from '../store/PortfolioSlice';
import { colors } from '../config/Color';

export default function GoldCard() {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState('1');
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState('0.00');

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(`https://kapalicarsi.apiluna.org`);
        const data = await res.json();
        const gold = data.find(i => i.code === 'ALTIN');
        if (gold) {
          setPrice(parseFloat(gold.satis));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrice();
  }, []);

  useEffect(() => {
    const qty = parseFloat(quantity);
    if (!isNaN(qty)) {
      setTotal((price * qty).toFixed(2));
    } else {
      setTotal('0.00');
    }
  }, [price, quantity]);

  const handleAdd = () => {
    const qty = parseFloat(quantity);
    if (!qty || qty <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity.');
      return;
    }
    dispatch(addSymbol({
      symbol: 'GA',
      type: 'gold',
      quantity: qty,
      price,
    }));
    Alert.alert('Success', `Gold added to portfolio.`);
    setQuantity('1');
  };

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Gold (Gram)</Text>
        <TouchableOpacity onPress={handleAdd}>
          <Ionicons name="cart-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.price}>Price: {price.toFixed(2)} TRY</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Grams:</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          keyboardType="decimal-pad"
          onChangeText={setQuantity}
        />
      </View>

      <Text style={styles.total}>Total: {total} TRY</Text>
    </View>
  );
}

const styles = StyleSheet.create({card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  price: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: colors.textPrimary,
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 8,
    minWidth: 60,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  }
});
