import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button } from 'react-native';
import { colors } from '../config/Color';
import { useDispatch } from 'react-redux';
import { addSymbol } from '../store/PortfolioSlice';

export default function GoldCard() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grams, setGrams] = useState('');
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch(`https://kapalicarsi.apiluna.org`);
        const data = await response.json();
        const gold = data.find(item => item.code === 'ALTIN');
        if (gold) {
          setPrice(parseFloat(gold.satis));
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoldPrice();
  }, []);

  useEffect(() => {
    if (price && grams) {
      const calculated = parseFloat(price) * parseFloat(grams);
      setTotal(calculated);
    } else {
      setTotal(0);
    }
  }, [grams, price]);

  const handleStore = () => {
    if (price && grams) {
      console.log('Dispatching addSymbol with:', { grams, price });
      dispatch(
        addSymbol({
          symbol: 'GA',
          type: 'gold',
          quantity: parseFloat(grams),
          price: price,
        })
      );
      console.log('Stored:', grams, 'grams at', price);
    } else {
      console.log('Price or grams missing:', price, grams);
    }
  };

  // Yeni test butonu için fonksiyon
  const handleTestStore = () => {
    dispatch(
      addSymbol({
        symbol: 'GA',
        type: 'gold',
        quantity: 1,
        price: 2500,
      })
    );
    console.log('Test store done');
  };

  return (
    <View style={styles.card}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <>
          <Text style={styles.title}>Gold (Gram)</Text>
          <Text style={styles.price}>
            {price ? `${price.toFixed(2)} TRY` : 'No Data'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter grams"
            placeholderTextColor="#ddd"
            keyboardType="numeric"
            value={grams}
            onChangeText={setGrams}
          />

          <Text style={styles.total}>Total: {total.toFixed(2)} TRY</Text>

          <View style={{ marginTop: 12 }}>
            <Button title="Store" onPress={handleStore} />
          </View>

          <View style={{ marginTop: 12 }}>
            <Button title="Test Store" onPress={handleTestStore} color="orange" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    backgroundColor: '#333',
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    color: colors.textPrimary,
  },
});
