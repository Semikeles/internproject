import { createSlice } from '@reduxjs/toolkit';

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    symbols: [
      // { symbol: 'BTC', type: 'crypto' },
      // { symbol: 'AAPL', type: 'nasdaq' },
      // { symbol: 'AKBNK', type: 'bist', quantity: 10, price: 30.5 },
      // { symbol: 'GA', type: 'gold', quantity: 2.5, price: 2450 }
    ],
  },
  reducers: {
    addSymbol: (state, action) => {
      const {
        symbol,
        type = 'crypto',
        quantity = 0,
        price = 0,
      } = action.payload;

      const normalizedSymbol = symbol.toUpperCase();

      const existing = state.symbols.find(
        s => s.symbol.toUpperCase() === normalizedSymbol && s.type === type
      );

      if (existing) {
        if (type === 'bist') {
          // BIST için miktar artar
          existing.quantity += quantity;
          existing.price = price; // son fiyat
        } else if (type === 'gold') {
          // Altın için miktar artar
          existing.quantity += quantity;
          existing.price = price; // son gram fiyat
        }
      } else {
        state.symbols.push({
          symbol: normalizedSymbol,
          type,
          quantity,
          price,
        });
      }
    },

    removeSymbol: (state, action) => {
      const { symbol, type } = action.payload;
      state.symbols = state.symbols.filter(
        s =>
          s.symbol.toUpperCase() !== symbol.toUpperCase() ||
          s.type !== type
      );
    },

    clearPortfolio: (state) => {
      state.symbols = [];
    },
  },
});

export const { addSymbol, removeSymbol, clearPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
