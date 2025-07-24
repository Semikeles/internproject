import portfolioReducer from './PortfolioSlice';  
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
});
