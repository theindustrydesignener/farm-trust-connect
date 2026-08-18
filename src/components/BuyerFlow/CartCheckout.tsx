import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Plus, Package, MapPin, Truck, Shield, Check } from '@phosphor-icons/react';
import { AppScreen, Product, Farmer, CartItem, Order, Address, UserProfile } from '../../types';
import { formatNaira } from './data';

/* ──────────── CartScreen ──────────── */
interface CartProps { navigateTo: (s: AppScreen) => void; cart: CartItem[]; updateCartQty: (pid: string, d: number) => void; removeFromCart: (pid: string) => void; }
export function CartScreen({ navigateTo, cart, updateCartQty, removeFromCart }: CartProps) {
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  return (
    <div className="p-4 pb-28">
      <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Your Cart</h2>
      {cart.length === 0 ? (
        <div className="mt-16 text-center text-gray-400">
          <Package size={48} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">Your cart is empty</p>
          <button onClick={() => navigateTo('home')} className="mt-4 text-green-600 text-sm font-medium">Start Shopping</button>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {cart.map(item => (
            <div key={item.productId} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{item.product.name}</h4>
                <p className="text-xs text-gray-500">{item.farmer.farmName}</p>
                <p className="text-sm font-bold text-green-700 mt-1">{formatNaira(item.product.price * item.quantity)}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => updateCartQty(item.productId, -1)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"><Minus size={12} className="text-gray-600" /></button>
                <span className="w-7 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                <button onClick={() => updateCartQty(item.productId, 1)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"><Plus size={12} className="text-gray-600" /></button>
              </div>
              <button onClick={() => removeFromCart(item.productId)} className="p-1"><X size={14} className="text-gray-400" /></button>
            </div>
          ))}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-4">
            <div className="flex items-center justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-semibold text-gray-900">{formatNaira(total)}</span></div>
            <div className="flex items-center justify-between text-sm mt-2"><span className="text-gray-500">Delivery</span><span className="font-semibold text-gray-900">Calculated at checkout</span></div>
            <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-lg font-bold text-green-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formatNaira(total)}</span>
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigateTo('checkout')} className="w-full bg-green-600 text-white font-bold py-3.5 rounded-full text-sm mt-2">Proceed to Checkout</motion.button>
        </div>
      )}
    </div>
  );
}

/* ──────────── CheckoutScreen ──────────── */
interface CheckoutProps { navigateTo: (s: AppScreen) => void; cart: CartItem[]; placeOrder: (a: Address, pm: string, lp: string) => void; userProfile: UserProfile; }
export function CheckoutScreen({ navigateTo, cart, placeOrder, userProfile }: CheckoutProps) {
  const [selectedAddr, setSelectedAddr] = useState(userProfile.addresses[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('Paystack Card');
  const [logistics, setLogistics] = useState('FarmLink Express');
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const deliveryFee = logistics === 'FarmLink Express' ? 2500 : 3500;

  return (
    <div className="p-4 pb-28">
      <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Checkout</h2>
      <div className="mt-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Delivery Address</h3>
          {userProfile.addresses.map(addr => (
            <button key={addr.id} onClick={() => setSelectedAddr(addr.id)} className={`w-full text-left p-3 rounded-xl border mb-2 transition-colors ${selectedAddr === addr.id ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-green-600" />
                <span className="text-sm font-medium text-gray-900">{addr.label}</span>
                {addr.isDefault && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>}
              </div>
              <p className="text-xs text-gray-500 mt-1">{addr.street}, {addr.city}, {addr.state}</p>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Method</h3>
          {['Paystack Card', 'Bank Transfer', 'USSD'].map(pm => (
            <button key={pm} onClick={() => setPaymentMethod(pm)} className={`w-full text-left p-3 rounded-xl border mb-2 transition-colors ${paymentMethod === pm ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === pm ? 'border-green-600' : 'border-gray-300'}`}>
                  {paymentMethod === pm && <div className="w-2.5 h-2.5 rounded-full bg-green-600" />}
                </div>
                <span className="text-sm text-gray-900">{pm}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Delivery Option</h3>
          {['FarmLink Express', 'GIG Logistics'].map(lp => (
            <button key={lp} onClick={() => setLogistics(lp)} className={`w-full text-left p-3 rounded-xl border mb-2 transition-colors ${logistics === lp ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-green-600" />
                <span className="text-sm text-gray-900">{lp}</span>
                <span className="text-xs text-gray-400 ml-auto">{lp === 'FarmLink Express' ? '₦2,500' : '₦3,500'}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="flex items-center justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-semibold text-gray-900">{formatNaira(total)}</span></div>
          <div className="flex items-center justify-between text-sm mt-2"><span className="text-gray-500">Delivery Fee</span><span className="font-semibold text-gray-900">{formatNaira(deliveryFee)}</span></div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between"><span className="font-semibold text-gray-900">Total</span><span className="text-lg font-bold text-green-700">{formatNaira(total + deliveryFee)}</span></div>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
          <Shield size={20} className="text-blue-600 shrink-0 mt-0.5" />
          <div><p className="text-sm font-semibold text-blue-900">Escrow Protected</p><p className="text-xs text-blue-700 mt-1">Your payment is held securely until you confirm delivery. Your money is always safe.</p></div>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => placeOrder(userProfile.addresses.find(a => a.id === selectedAddr) || userProfile.addresses[0], paymentMethod, logistics)} className="w-full bg-green-600 text-white font-bold py-3.5 rounded-full text-sm">
          Place Order - {formatNaira(total + deliveryFee)}
        </motion.button>
      </div>
    </div>
  );
}

/* ──────────── PaymentSuccessScreen ──────────── */
export function PaymentSuccessScreen({ navigateTo, selectedOrder }: { navigateTo: (s: AppScreen) => void; selectedOrder: Order | null; }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }} className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <Check size={36} className="text-green-600" weight="bold" />
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Order Placed!</h2>
      <p className="text-gray-500 text-sm text-center mt-2">Your order has been placed successfully. Escrow protection is active.</p>
      {selectedOrder && (
        <div className="bg-gray-50 rounded-2xl p-4 w-full mt-6">
          <div className="flex items-center justify-between text-sm"><span className="text-gray-500">Order ID</span><span className="font-semibold text-gray-900">{selectedOrder.id}</span></div>
          <div className="flex items-center justify-between text-sm mt-2"><span className="text-gray-500">Total</span><span className="font-semibold text-green-700">{formatNaira(selectedOrder.totalAmount + selectedOrder.deliveryFee)}</span></div>
          <div className="flex items-center justify-between text-sm mt-2"><span className="text-gray-500">Delivery</span><span className="font-semibold text-gray-900">{selectedOrder.logisticsProvider}</span></div>
        </div>
      )}
      <div className="flex gap-3 mt-8 w-full">
        <button onClick={() => navigateTo('orderTracking')} className="flex-1 bg-green-600 text-white font-bold py-3.5 rounded-full text-sm">Track Order</button>
        <button onClick={() => navigateTo('home')} className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-full text-sm">Back to Home</button>
      </div>
    </div>
  );
}