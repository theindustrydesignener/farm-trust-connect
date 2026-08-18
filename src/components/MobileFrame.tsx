import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, User, Package, ShoppingCart, Plus, House, MagnifyingGlass,
  List, ArrowLeft, X, Check, ChatCircleDots, GearSix, UserCircle,
  Storefront, SignOut, MapPin, Clock
} from '@phosphor-icons/react';
import { AppScreen, ViewMode, Farmer, Product, CartItem, Order, UserProfile, Notification, ChatMessage, Address } from '../types';
import BuyerFlow from './BuyerFlow';
import FarmerFlow from './FarmerFlow';
import InteractiveExtras from './InteractiveExtras';
import { farmers, products, defaultUser, sampleOrders, sampleChats, sampleNotifications } from '../data/mockData';

interface MobileFrameProps {
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
}

const PHOSPHOR_ICONS = {
  House, Bell, User, Package, ShoppingCart, Plus, MagnifyingGlass, List,
  ArrowLeft, X, Check, ChatCircleDots, GearSix, UserCircle, Storefront, SignOut, MapPin, Clock
};

export default function MobileFrame({ viewMode, setViewMode }: MobileFrameProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'cart' | 'orders' | 'profile'>('home');
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [userRole, setUserRole] = useState<'buyer' | 'farmer'>('buyer');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(sampleChats);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUser);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChatList, setShowChatList] = useState(false);
  const [chatPartner, setChatPartner] = useState<Farmer | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadChats = chatMessages.filter(m => !m.read && m.senderId !== 'u1').length;

  const addToCart = (product: Product, farmer: Farmer, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { productId: product.id, farmerId: farmer.id, quantity, product, farmer }];
    });
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.productId !== productId) return i;
      const newQty = i.quantity + delta;
      return newQty <= 0 ? { ...i, quantity: 0 } : { ...i, quantity: newQty };
    }).filter(i => i.quantity > 0));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.productId !== productId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (deliveryAddress: Address, paymentMethod: string, logisticsProvider: string) => {
    const totalAmount = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const deliveryFee = logisticsProvider === 'FarmLink Express' ? 2500 : 3500;
    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      items: [...cart],
      totalAmount,
      deliveryFee,
      status: 'pending',
      createdAt: new Date().toISOString(),
      deliveryAddress,
      paymentMethod,
      escrowActive: true,
      tracking: [
        { status: 'ordered', label: 'Order Placed', timestamp: new Date().toISOString(), completed: true },
        { status: 'escrow', label: 'Escrow Locked', timestamp: '', completed: false },
        { status: 'dispatch', label: 'Dispatch from Farm', timestamp: '', completed: false },
        { status: 'transit', label: 'In Transit', timestamp: '', completed: false },
        { status: 'delivered', label: 'Delivered', timestamp: '', completed: false },
      ],
      logisticsProvider,
    };
    setOrders(prev => [newOrder, ...prev]);
    setNotifications(prev => [{
      id: `n${Date.now()}`,
      type: 'order',
      title: 'Order Placed!',
      message: `Your order ${newOrder.id} has been placed. Escrow protection active.`,
      timestamp: new Date().toISOString(),
      read: false,
      actionLink: 'orderTracking',
    }, ...prev]);
    clearCart();
    setCurrentScreen('paymentSuccess');
    setSelectedOrder(newOrder);
  };

  const sendMessage = (text: string, receiverId: string) => {
    const newMsg: ChatMessage = {
      id: `msg${Date.now()}`,
      senderId: 'u1',
      receiverId,
      text,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const markNotifRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markChatRead = (senderId: string) => {
    setChatMessages(prev => prev.map(m => m.senderId === senderId ? { ...m, read: true } : m));
  };

  const getFarmerById = (id: string) => farmers.find(f => f.id === id);
  const getProductById = (id: string) => products.find(p => p.id === id);

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
    if (screen === 'home') setActiveTab('home');
    else if (screen === 'search') setActiveTab('search');
    else if (screen === 'cart') setActiveTab('cart');
    else if (screen === 'orderHistory') setActiveTab('orders');
    else if (screen === 'buyerProfile' || screen === 'farmerDashboard') setActiveTab('profile');
  };

  const handleTabPress = (tab: 'home' | 'search' | 'cart' | 'orders' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') navigateTo('home');
    else if (tab === 'search') navigateTo('search');
    else if (tab === 'cart') navigateTo('cart');
    else if (tab === 'orders') navigateTo('orderHistory');
    else if (tab === 'profile') navigateTo(userRole === 'buyer' ? 'buyerProfile' : 'farmerDashboard');
  };

  const handleFarmerAction = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const content = (
    <div className={`flex flex-col h-full ${highContrast ? 'high-contrast' : ''}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          {currentScreen !== 'home' && currentScreen !== 'splash' && currentScreen !== 'onboarding' && currentScreen !== 'login' ? (
            <button onClick={() => navigateTo('home')} className="p-1 -ml-1 rounded-full hover:bg-gray-100" aria-label="Back">
              <ArrowLeft size={22} className="text-gray-700" />
            </button>
          ) : null}
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">F</span>
            </div>
            <span className="font-bold text-lg text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>FarmLink</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Role switcher */}
          <button
            onClick={() => setUserRole(prev => prev === 'buyer' ? 'farmer' : 'buyer')}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              userRole === 'farmer' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
            }`}
            aria-label={`Switch to ${userRole === 'buyer' ? 'farmer' : 'buyer'} view`}
          >
            {userRole === 'farmer' ? 'Farmer' : 'Buyer'}
          </button>
          {/* Notifications bell */}
          <button onClick={() => setShowNotifications(true)} className="relative p-2 rounded-full hover:bg-gray-100" aria-label="Notifications">
            <Bell size={20} className="text-gray-600" />
            {unreadNotifs > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadNotifs > 9 ? '9+' : unreadNotifs}
              </span>
            )}
          </button>
          {/* View mode toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'mobile' ? 'full' : 'mobile')}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Toggle view mode"
          >
            {viewMode === 'mobile' ? (
              <span className="text-xs font-medium text-gray-500">Full</span>
            ) : (
              <span className="text-xs font-medium text-green-600">Mobile</span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {userRole === 'buyer' ? (
          <BuyerFlow
            currentScreen={currentScreen}
            navigateTo={navigateTo}
            cart={cart}
            addToCart={addToCart}
            updateCartQty={updateCartQty}
            removeFromCart={removeFromCart}
            placeOrder={placeOrder}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            selectedFarmer={selectedFarmer}
            setSelectedFarmer={setSelectedFarmer}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            getFarmerById={getFarmerById}
            getProductById={getProductById}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            notifications={notifications}
            markNotifRead={markNotifRead}
            markAllNotifsRead={markAllNotifsRead}
            highContrast={highContrast}
            setShowChatList={setShowChatList}
            showChatList={showChatList}
            chatMessages={chatMessages}
            markChatRead={markChatRead}
            sendMessage={sendMessage}
            chatPartner={chatPartner}
            setChatPartner={setChatPartner}
            setShowSupport={setShowSupport}
            showSupport={showSupport}
            setShowSettings={setShowSettings}
            showSettings={showSettings}
            setHighContrast={setHighContrast}
            handleLogout={handleLogout}
            setCurrentScreen={setCurrentScreen}
          />
        ) : (
          <FarmerFlow
            currentScreen={currentScreen}
            navigateTo={handleFarmerAction}
            setCurrentScreen={setCurrentScreen}
            showAddProduct={showAddProduct}
            setShowAddProduct={setShowAddProduct}
            orders={orders}
            setOrders={setOrders}
            chatMessages={chatMessages}
            markChatRead={markChatRead}
            sendMessage={sendMessage}
            chatPartner={chatPartner}
            setChatPartner={setChatPartner}
            showChatList={showChatList}
            setShowChatList={setShowChatList}
            getFarmerById={getFarmerById}
            highContrast={highContrast}
            setShowSettings={setShowSettings}
            showSettings={showSettings}
            setHighContrast={setHighContrast}
            handleLogout={handleLogout}
            notifications={notifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            markNotifRead={markNotifRead}
            markAllNotifsRead={markAllNotifsRead}
            setShowSupport={setShowSupport}
            showSupport={showSupport}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="flex items-center justify-around px-2 py-2 bg-white border-t border-gray-100 shrink-0">
        {[
          { key: 'home' as const, label: 'Home', icon: House },
          { key: 'search' as const, label: 'Search', icon: MagnifyingGlass },
          { key: 'cart' as const, label: 'Cart', icon: ShoppingCart, badge: cartCount },
          { key: 'orders' as const, label: 'Orders', icon: Package },
          { key: 'profile' as const, label: 'Profile', icon: UserCircle },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => handleTabPress(item.key)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors relative ${
              activeTab === item.key ? 'text-green-600' : 'text-gray-400'
            }`}
            aria-label={item.label}
          >
            <item.icon size={22} weight={activeTab === item.key ? 'fill' : 'regular'} />
            <span className="text-[10px] font-medium">{item.label}</span>
            {item.badge && item.badge > 0 ? (
              <span className="absolute -top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>
    </div>
  );

  if (viewMode === 'full') {
    return (
      <div className="min-h-screen bg-gray-50">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-4 border-gray-900 relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-2xl z-10 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-700" />
          <div className="w-16 h-1.5 rounded-full bg-gray-700" />
        </div>
        <div className="h-full pt-6 overflow-hidden">
          {content}
        </div>
      </div>
    </div>
  );
}