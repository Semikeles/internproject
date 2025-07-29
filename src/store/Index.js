import portfolioReducer from '../store/PortfolioSlice'; 
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
});
