import { motion } from 'framer-motion';
import { X, MapPin, Check, Truck, Shield, Star, SealCheck, ChatCircleDots, Phone, ArrowRight, List, Heart, Bell } from '@phosphor-icons/react';
import { AppScreen, Order, Farmer, UserProfile } from '../../types';
import { formatNaira, farmers, getFarmerProducts, getFarmerById } from './data';
import { StarRating, ProductCard } from './SharedComponents';

/* ──────────── OrderTrackingScreen ──────────── */
export function OrderTrackingScreen({ navigateTo, selectedOrder }: { navigateTo: (s: AppScreen) => void; selectedOrder: Order | null; }) {
  if (!selectedOrder) return <div className="p-4 text-center text-gray-400 text-sm">No order selected</div>;
  const steps = selectedOrder.tracking;
  const completed = steps.filter(s => s.completed).length;
  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div><h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Track Order</h2><p className="text-xs text-gray-500 mt-1">{selectedOrder.id}</p></div>
          <div className="text-right"><p className="text-xs text-gray-500">{selectedOrder.logisticsProvider}</p><p className="text-sm font-bold text-green-700 mt-1">{formatNaira(selectedOrder.totalAmount + selectedOrder.deliveryFee)}</p></div>
        </div>
        <div className="mt-6 bg-gray-100 rounded-full h-2"><div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${(completed / steps.length) * 100}%` }} /></div>
        <div className="mt-6 space-y-0">
          {steps.map((step, i) => (
            <div key={step.status} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {step.completed ? <Check size={14} weight="bold" /> : <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />}
                </div>
                {i < steps.length - 1 && <div className={`w-0.5 h-10 ${step.completed ? 'bg-green-200' : 'bg-gray-100'}`} />}
              </div>
              <div className="pb-8">
                <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                {step.timestamp && <p className="text-xs text-gray-400 mt-0.5">{new Date(step.timestamp).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
        <Shield size={20} className="text-blue-600 shrink-0 mt-0.5" />
        <div><p className="text-sm font-semibold text-blue-900">Escrow Protection Active</p><p className="text-xs text-blue-700 mt-1">Your payment of {formatNaira(selectedOrder.totalAmount + selectedOrder.deliveryFee)} is secured until you confirm delivery.</p></div>
      </div>
      <button onClick={() => navigateTo('home')} className="w-full mt-4 bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-full text-sm">Back to Home</button>
    </div>
  );
}

/* ──────────── OrderHistoryScreen ──────────── */
export function OrderHistoryScreen({ navigateTo, orders }: { navigateTo: (s: AppScreen) => void; orders: Order[]; }) {
  const statusColors: Record<string, string> = { pending: 'bg-amber-100 text-amber-800', confirmed: 'bg-blue-100 text-blue-800', processing: 'bg-blue-100 text-blue-800', shipped: 'bg-purple-100 text-purple-800', delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800' };
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>My Orders</h2>
      <div className="mt-4 space-y-3">
        {orders.map(order => (
          <button key={order.id} onClick={() => navigateTo('orderTracking')} className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">{order.id}</span>
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-bold text-green-700">{formatNaira(order.totalAmount + order.deliveryFee)}</span>
              <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <Truck size={12} /> {order.logisticsProvider}
              {order.escrowActive && <><span className="text-gray-200">|</span><Shield size={12} className="text-blue-500" /> Escrow</>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ──────────── FarmerProfileScreen ──────────── */
export function FarmerProfileScreen({ navigateTo }: { navigateTo: (s: AppScreen) => void }) {
  const farmer = farmers[0];
  const farmerProducts = getFarmerProducts(farmer.id);
  return (
    <div className="pb-4">
      <div className="relative h-48 bg-gray-200">
        <img src={farmer.coverImage} alt="" className="w-full h-full object-cover" />
        <button onClick={() => navigateTo('home')} className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"><X size={16} className="text-gray-700" /></button>
      </div>
      <div className="px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-green-100 shrink-0"><img src={farmer.avatar} alt={farmer.name} className="w-full h-full object-cover" /></div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5"><h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{farmer.farmName}</h2>{farmer.verified && <SealCheck size={16} className="text-green-600" weight="fill" />}</div>
              <p className="text-sm text-gray-500">{farmer.name}</p>
              <div className="flex items-center gap-2 mt-1"><StarRating rating={farmer.rating} size={12} /><span className="text-xs text-gray-400">{farmer.rating} ({farmer.reviewCount} reviews)</span></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center"><p className="text-lg font-bold text-gray-900">{farmer.productCount}</p><p className="text-[10px] text-gray-500">Products</p></div>
            <div className="text-center"><p className="text-lg font-bold text-gray-900">{farmer.farmSize}</p><p className="text-[10px] text-gray-500">Farm Size</p></div>
            <div className="text-center"><p className="text-lg font-bold text-gray-900">{new Date(farmer.joinedDate).getFullYear()}</p><p className="text-[10px] text-gray-500">Joined</p></div>
          </div>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">{farmer.bio}</p>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-green-600 text-white font-semibold text-sm py-2.5 rounded-full flex items-center justify-center gap-2"><ChatCircleDots size={16} /> Message</button>
            <button className="flex-1 bg-gray-100 text-gray-700 font-semibold text-sm py-2.5 rounded-full flex items-center justify-center gap-2"><Phone size={16} /> Call</button>
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 text-sm mt-5 mb-3">Products from {farmer.farmName}</h3>
        <div className="grid grid-cols-2 gap-3">{farmerProducts.map(product => (<ProductCard key={product.id} product={product} onTap={() => navigateTo('productDetail')} />))}</div>
      </div>
    </div>
  );
}

/* ──────────── BuyerProfileScreen ──────────── */
function GearSix(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke={props.color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
function SignOut(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke={props.color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>; }

export function BuyerProfileScreen({ navigateTo, userProfile, setShowSettings, setShowSupport, handleLogout }: {
  navigateTo: (s: AppScreen) => void; userProfile: UserProfile; setShowSettings: (b: boolean) => void; setShowSupport: (b: boolean) => void; handleLogout: () => void;
}) {
  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 overflow-hidden"><img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" /></div>
        <div><h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{userProfile.name}</h2><p className="text-sm text-gray-500">{userProfile.phone}</p><p className="text-xs text-gray-400">{userProfile.email}</p></div>
      </div>
      <div className="mt-4 space-y-1">
        {[
          { icon: List, label: 'Order History', action: () => navigateTo('orderHistory') },
          { icon: MapPin, label: 'Saved Addresses', action: () => {} },
          { icon: Heart, label: 'Favorites', action: () => {} },
          { icon: Bell, label: 'Notifications', action: () => {} },
          { icon: GearSix, label: 'Settings', action: () => setShowSettings(true) },
          { icon: ChatCircleDots, label: 'Help & Support', action: () => setShowSupport(true) },
          { icon: SignOut, label: 'Logout', action: handleLogout, danger: true },
        ].map(item => (
          <button key={item.label} onClick={item.action} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors ${item.danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'}`}>
            <item.icon size={20} className={item.danger ? 'text-red-400' : 'text-gray-400'} />
            <span className="text-sm font-medium">{item.label}</span>
            <ArrowRight size={16} className="ml-auto text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  );
}