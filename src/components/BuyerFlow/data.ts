import { AppScreen, Product, Farmer, CartItem, Order, UserProfile, Address } from '../../types';
import { farmers, products, categories, sampleReviews, aiRecommendations, onboardingSteps, nigerianStates } from '../../data/mockData';
import { formatNaira } from './utils';

export { formatNaira, products, farmers, categories, sampleReviews, aiRecommendations, onboardingSteps, nigerianStates };
export type { AppScreen, Product, Farmer, CartItem, Order, UserProfile, Address };

export const getFarmerById = (id: string) => farmers.find(f => f.id === id);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getCategoryProducts = (cat: string) => products.filter(p => p.category === cat);
export const getFarmerProducts = (farmerId: string) => products.filter(p => p.farmerId === farmerId);
export const getProductReviews = (productId: string) => sampleReviews.filter(r => r.productId === productId);
export const getProductRating = (productId: string) => {
  const revs = getProductReviews(productId);
  return revs.length ? revs.reduce((s, r) => s + r.rating, 0) / revs.length : 0;
};