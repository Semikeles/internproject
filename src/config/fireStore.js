import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

/**
 * Saves the user's portfolio data to Firestore.
 * @param {string} uid - User's UID
 * @param {Array} portfolio - Portfolio data from Redux store (state.portfolio.symbols)
 */
export const savePortfolioToFirestore = async (uid, portfolio) => {
  if (!uid) return;

  try {
    const userRef = doc(db, 'portfolios', uid);
    await setDoc(userRef, { symbols: portfolio });
    console.log('Portfolio saved successfully');
  } catch (error) {
    console.error('Error saving portfolio:', error);
  }
};

/**
 * Loads the user's portfolio data from Firestore.
 * @param {string} uid - User's UID
 * @returns {Array|null} - User's portfolio array or null if not found
 */
export const loadPortfolioFromFirestore = async (uid) => {
  if (!uid) return null;

  try {
    const userRef = doc(db, 'portfolios', uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.symbols || [];
    } else {
      console.log('No portfolio found for user');
      return [];
    }
  } catch (error) {
    console.error('Error loading portfolio:', error);
    return null;
  }
};
