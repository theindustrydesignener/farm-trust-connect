import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Heart, Star, Leaf, Minus, Plus, Package, Storefront, SealCheck } from '@phosphor-icons/react';
import { AppScreen, Product, Farmer, CartItem } from '../../types';
import { formatNaira, products, getFarmerById, getProductReviews, getProductRating } from './data';
import { StarRating } from './SharedComponents';

interface PDProps { navigateTo: (s: AppScreen) => void; addToCart: (p: Product, f: Farmer, q?: number) => void; cart: CartItem[]; }
export function ProductDetailScreen({ navigateTo, addToCart }: PDProps) {
  const [qty, setQty] = useState(1);
  const product = products[0];
  const farmer = getFarmerById(product.farmerId)!;
  const reviews = getProductReviews(product.id);
  const rating = getProductRating(product.id);

  return (
    <div className="pb-24">
      <div className="relative h-64 bg-gray-100">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        <button onClick={() => navigateTo('home')} className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"><X size={16} className="text-gray-700" /></button>
        {product.organic && <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5"><Leaf size={12} weight="fill" /> Organic</span>}
      </div>
      <div className="px-4 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.name}</h1>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={12} /> {product.origin}, {product.state}</p>
            </div>
            <Heart size={22} className="text-gray-300 hover:text-red-400 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 mt-3"><StarRating rating={rating} size={14} /><span className="text-xs text-gray-500">{rating.toFixed(1)} ({reviews.length} reviews)</span></div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-2xl font-bold text-green-700" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formatNaira(product.price)}</span>
            <span className="text-sm text-gray-400">/{product.unit}</span>
          </div>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">{product.description}</p>
          <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 overflow-hidden"><img src={farmer.avatar} alt={farmer.name} className="w-full h-full object-cover" /></div>
            <div className="flex-1"><p className="text-sm font-semibold text-gray-900">{farmer.farmName}</p><p className="text-xs text-gray-500">{farmer.location}, {farmer.state}</p></div>
            <button onClick={() => navigateTo('farmerProfile')} className="text-xs text-green-600 font-medium">View Farm</button>
          </div>
          {product.bulkDiscount.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">Bulk Discounts</p>
              <div className="space-y-1.5">{product.bulkDiscount.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-green-50 rounded-lg px-3 py-2">
                  <span className="text-gray-600">Buy {d.qty}+ {product.unit}</span>
                  <span className="font-semibold text-green-700">{formatNaira(d.price)} / {product.unit}</span>
                </div>
              ))}</div>
            </div>
          )}
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Reviews</h3>
            {reviews.slice(0, 3).map(r => (
              <div key={r.id} className="mb-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2"><span className="text-sm font-medium text-gray-900">{r.userName}</span><StarRating rating={r.rating} size={11} /></div>
                <p className="text-xs text-gray-500 mt-1">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-4 max-w-[375px] mx-auto">
        <div className="flex items-center border border-gray-200 rounded-xl">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2.5"><Minus size={16} className="text-gray-600" /></button>
          <span className="px-3 font-semibold text-sm text-gray-900">{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="p-2.5"><Plus size={16} className="text-gray-600" /></button>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => { addToCart(product, farmer, qty); navigateTo('cart'); }} className="flex-1 bg-green-600 text-white font-bold py-3 rounded-full text-sm flex items-center justify-center gap-2">
          <Package size={16} weight="fill" /> Add to Cart - {formatNaira(product.price * qty)}
        </motion.button>
      </div>
    </div>
  );
}