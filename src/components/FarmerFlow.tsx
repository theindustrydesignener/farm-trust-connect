import { motion } from 'framer-motion';
import { Package, Users, ChartLine, Storefront, Bell, SealCheck, MapPin, Star, Plus, List, ArrowRight, X } from '@phosphor-icons/react';
import { AppScreen, Order, Notification, Farmer, ChatMessage } from '../types';
import { formatNaira } from './BuyerFlow/data';

interface FarmerFlowProps {
  currentScreen: AppScreen; navigateTo: (s: AppScreen) => void;
  highContrast: boolean; setShowNotifications: (b: boolean) => void;
  setCurrentScreen?: (s: AppScreen) => void;
  showAddProduct?: boolean; setShowAddProduct?: (b: boolean) => void;
  orders?: Order[]; setOrders?: (o: Order[]) => void;
  chatMessages?: ChatMessage[]; markChatRead?: (id: string) => void;
  sendMessage?: (t: string, r: string) => void;
  chatPartner?: Farmer | null; setChatPartner?: (f: Farmer | null) => void;
  showChatList?: boolean; setShowChatList?: (b: boolean) => void;
  getFarmerById?: (id: string) => Farmer | undefined;
  setShowSettings?: (b: boolean) => void; showSettings?: boolean;
  setHighContrast?: (b: boolean) => void; handleLogout?: () => void;
  notifications?: Notification[]; showNotifications?: boolean;
  markNotifRead?: (id: string) => void; markAllNotifsRead?: () => void;
  setShowSupport?: (b: boolean) => void; showSupport?: boolean;
}

export default function FarmerFlow({ navigateTo, highContrast, setShowNotifications }: FarmerFlowProps) {
  const stats = [
    { label: 'Active Orders', value: '12', icon: Package, color: 'green' },
    { label: 'Total Products', value: '34', icon: Storefront, color: 'blue' },
    { label: 'Customers', value: '89', icon: Users, color: 'purple' },
    { label: 'Revenue (This Month)', value: '₦1.2M', icon: ChartLine, color: 'amber' },
  ];

  const recentOrders = [
    { id: 'ORD-045', customer: 'Chidi O.', product: 'Yam Tubers', qty: '3 bags', amount: 135000, status: 'shipped' },
    { id: 'ORD-046', customer: 'Amara E.', product: 'Garri', qty: '2 bags', amount: 64000, status: 'pending' },
    { id: 'ORD-047', customer: 'Femi A.', product: 'Cassava', qty: '5 bags', amount: 90000, status: 'processing' },
  ];

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-700 to-green-900 text-white p-5 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Green Valley Farms</h1>
            <p className="text-green-200 text-sm mt-0.5">Farmer Dashboard</p>
          </div>
          <button onClick={() => setShowNotifications(true)} className="relative w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
            <Bell size={20} className="text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-green-200"><SealCheck size={12} className="text-green-300" /> Verified Farmer</div>
          <span className="text-green-300">|</span>
          <div className="flex items-center gap-1 text-xs text-green-200"><MapPin size={12} /> Ibadan, Oyo State</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 -mt-5 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 rounded-xl bg-${stat.color}-100 flex items-center justify-center mb-2`}>
                <stat.icon size={18} className={`text-${stat.color}-600`} />
              </div>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-5 px-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Quick Actions</h3>
        <div className="flex gap-3">
          <button className="flex-1 bg-green-600 text-white rounded-2xl p-4 text-center">
            <Plus size={24} className="mx-auto mb-1" weight="bold" />
            <span className="text-xs font-semibold">Add Product</span>
          </button>
          <button className="flex-1 bg-blue-600 text-white rounded-2xl p-4 text-center">
            <List size={24} className="mx-auto mb-1" weight="bold" />
            <span className="text-xs font-semibold">Manage Listings</span>
          </button>
          <button className="flex-1 bg-purple-600 text-white rounded-2xl p-4 text-center">
            <Users size={24} className="mx-auto mb-1" weight="bold" />
            <span className="text-xs font-semibold">My Customers</span>
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-5 px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-sm">Recent Orders</h3>
          <button className="text-xs text-green-600 font-medium">View All</button>
        </div>
        <div className="space-y-2.5">
          {recentOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{order.id}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                  order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                }`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-sm text-gray-700">{order.customer}</p>
                  <p className="text-xs text-gray-400">{order.product} &bull; {order.qty}</p>
                </div>
                <span className="text-sm font-bold text-green-700">{formatNaira(order.amount)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}