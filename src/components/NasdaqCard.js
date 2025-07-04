import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { colors } from '../config/Color';
export default function StockCard() {
    const [quantity, setQuantity] = useState('1'); 
    const [price, setPrice] = useState(null); 
    const [total, setTotal] = useState(null);
}
