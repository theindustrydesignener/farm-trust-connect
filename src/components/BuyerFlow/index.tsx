import { AnimatePresence } from 'framer-motion';
import { AppScreen, Product, Farmer, CartItem, Order, UserProfile, Address } from '../../types';
import { SplashScreen, OnboardingScreen, LoginScreen } from './AuthScreens';
import { HomeScreen, SearchScreen } from './HomeScreens';
import { ProductDetailScreen } from './ProductDetail';
import { CartScreen, CheckoutScreen, PaymentSuccessScreen } from './CartCheckout';
import { OrderTrackingScreen, OrderHistoryScreen, FarmerProfileScreen, BuyerProfileScreen } from './OrderScreens';

/* ───────────── Props ───────────── */
interface BuyerFlowProps {
  currentScreen: AppScreen; navigateTo: (s: AppScreen) => void;
  cart: CartItem[]; addToCart: (p: Product, f: Farmer, q?: number) => void;
  updateCartQty: (pid: string, d: number) => void; removeFromCart: (pid: string) => void;
  placeOrder: (a: Address, pm: string, lp: string) => void;
  selectedProduct: Product | null; setSelectedProduct: (p: Product | null) => void;
  selectedFarmer: Farmer | null; setSelectedFarmer: (f: Farmer | null) => void;
  selectedOrder: Order | null; setSelectedOrder: (o: Order | null) => void;
  getFarmerById: (id: string) => Farmer | undefined;
  getProductById: (id: string) => Product | undefined;
  userProfile: UserProfile; setUserProfile: (p: UserProfile) => void;
  showNotifications: boolean; setShowNotifications: (b: boolean) => void;
  notifications: any[]; markNotifRead: (id: string) => void; markAllNotifsRead: () => void;
  highContrast: boolean;
  setShowChatList: (b: boolean) => void; showChatList: boolean;
  chatMessages: any[]; markChatRead: (id: string) => void; sendMessage: (t: string, r: string) => void;
  chatPartner: Farmer | null; setChatPartner: (f: Farmer | null) => void;
  setShowSupport: (b: boolean) => void; showSupport: boolean;
  setShowSettings: (b: boolean) => void; showSettings: boolean;
  setHighContrast: (b: boolean) => void; handleLogout: () => void;
  setCurrentScreen: (s: AppScreen) => void;
}

export default function BuyerFlow(props: BuyerFlowProps) {
  const { currentScreen, navigateTo, cart, addToCart, updateCartQty, removeFromCart, placeOrder,
    selectedProduct, setSelectedProduct, selectedFarmer, setSelectedFarmer, selectedOrder, setSelectedOrder,
    getFarmerById: _, getProductById: __, userProfile, setUserProfile,
    showNotifications, setShowNotifications, notifications, markNotifRead, markAllNotifsRead,
    highContrast, setShowChatList, showChatList, chatMessages, markChatRead, sendMessage,
    chatPartner, setChatPartner, setShowSupport, showSupport, setShowSettings, showSettings,
    setHighContrast, handleLogout, setCurrentScreen } = props;

  return (
    <AnimatePresence mode="wait">
      {currentScreen === 'splash' && <SplashScreen key="splash" onDone={() => navigateTo('onboarding')} />}
      {currentScreen === 'onboarding' && <OnboardingScreen key="onboarding" onDone={() => navigateTo('login')} />}
      {currentScreen === 'login' && <LoginScreen key="login" onLogin={() => navigateTo('home')} />}
      {currentScreen === 'home' && <HomeScreen key="home" navigateTo={navigateTo} addToCart={addToCart} cart={cart} />}
      {currentScreen === 'search' && <SearchScreen key="search" navigateTo={navigateTo} />}
      {currentScreen === 'productDetail' && <ProductDetailScreen key="pd" navigateTo={navigateTo} addToCart={addToCart} cart={cart} />}
      {currentScreen === 'cart' && <CartScreen key="cart" navigateTo={navigateTo} cart={cart} updateCartQty={updateCartQty} removeFromCart={removeFromCart} />}
      {currentScreen === 'checkout' && <CheckoutScreen key="checkout" navigateTo={navigateTo} cart={cart} placeOrder={placeOrder} userProfile={userProfile} />}
      {currentScreen === 'paymentSuccess' && <PaymentSuccessScreen key="ps" navigateTo={navigateTo} selectedOrder={selectedOrder} />}
      {currentScreen === 'orderTracking' && <OrderTrackingScreen key="ot" navigateTo={navigateTo} selectedOrder={selectedOrder} />}
      {currentScreen === 'orderHistory' && <OrderHistoryScreen key="oh" navigateTo={navigateTo} orders={[]} />}
      {currentScreen === 'farmerProfile' && <FarmerProfileScreen key="fp" navigateTo={navigateTo} />}
      {currentScreen === 'buyerProfile' && <BuyerProfileScreen key="bp" navigateTo={navigateTo} userProfile={userProfile} setShowSettings={setShowSettings} setShowSupport={setShowSupport} handleLogout={handleLogout} />}
    </AnimatePresence>
  );
}