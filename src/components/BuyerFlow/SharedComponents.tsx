import { Star, StarHalf, Storefront, Leaf, SealCheck, MapPin, ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Product, Farmer } from '../../types';
import { formatNaira, getFarmerById } from './data';

export function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<Star key={i} size={size} className="text-amber-400" weight="fill" />);
    else if (rating >= i - 0.5) stars.push(<StarHalf key={i} size={size} className="text-amber-400" weight="fill" />);
    else stars.push(<Star key={i} size={size} className="text-gray-300" />);
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export function ProductCard({ product, onTap }: { product: Product; onTap: () => void }) {
  const farmer = getFarmerById(product.farmerId);
  return (
    <motion.button whileTap={{ scale: 0.97 }} onClick={onTap} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 text-left w-full">
      <div className="relative h-32 bg-gray-100">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        {product.organic && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Leaf size={10} weight="fill" /> Organic
          </span>
        )}
        {product.verified && (
          <span className="absolute top-2 right-2 bg-white/90 text-green-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <SealCheck size={10} weight="fill" /> Verified
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{product.origin}, {product.state}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-green-700 text-sm">{formatNaira(product.price)}</span>
          <span className="text-[10px] text-gray-400">/{product.unit}</span>
        </div>
        {farmer && (
          <p className="text-[10px] text-gray-400 mt-1.5 flex items-center gap-1">
            <Storefront size={10} /> {farmer.farmName}
          </p>
        )}
      </div>
    </motion.button>
  );
}

export function FarmerCard({ farmer, onTap }: { farmer: Farmer; onTap: () => void }) {
  return (
    <motion.button whileTap={{ scale: 0.97 }} onClick={onTap} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left w-full">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-green-100 overflow-hidden shrink-0">
          <img src={farmer.avatar} alt={farmer.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-sm text-gray-900 truncate">{farmer.farmName}</h3>
            {farmer.verified && <SealCheck size={14} className="text-green-600 shrink-0" weight="fill" />}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{farmer.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={farmer.rating} size={12} />
            <span className="text-[10px] text-gray-400">({farmer.reviewCount})</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
            <MapPin size={10} /> {farmer.location}, {farmer.state}
          </p>
        </div>
        <ArrowRight size={18} className="text-gray-300 shrink-0" />
      </div>
    </motion.button>
  );
}