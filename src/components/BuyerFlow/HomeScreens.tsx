import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlass, X, SquaresFour, Sparkle, ArrowRight } from '@phosphor-icons/react';
import { AppScreen, Product, Farmer, CartItem } from '../../types';
import { products, categories, farmers } from './data';
import { ProductCard, FarmerCard } from './SharedComponents';

interface HomeProps { navigateTo: (s: AppScreen) => void; addToCart: (p: Product, f: Farmer) => void; cart: CartItem[]; }
export function HomeScreen({ navigateTo }: HomeProps) {
  const topFarmers = farmers.slice(0, 3);
  return (
    <div className="pb-4">
      <div className="mx-4 mt-4 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-1"><Sparkle size={16} weight="fill" /><span className="text-xs font-semibold uppercase tracking-wider">AI Recommended</span></div>
        <h2 className="text-xl font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Hot &amp; Fresh</h2>
        <p className="text-green-100 text-sm">Scotch Bonnet from Enugu</p>
        <button onClick={() => navigateTo('productDetail')} className="mt-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full inline-flex items-center gap-1.5">Shop Now <ArrowRight size={14} /></button>
      </div>
      <div className="mt-5 px-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Categories</h3>
        <div className="grid grid-cols-6 gap-2">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => navigateTo('search')} className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: cat.color + '15' }}>
                <SquaresFour size={20} color={cat.color} />
              </div>
              <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 px-4">
        <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-gray-900 text-sm">Top Farmers</h3><button onClick={() => navigateTo('search')} className="text-xs text-green-600 font-medium">See All</button></div>
        <div className="space-y-2.5">{topFarmers.map(farmer => (<FarmerCard key={farmer.id} farmer={farmer} onTap={() => navigateTo('farmerProfile')} />))}</div>
      </div>
      <div className="mt-5 px-4">
        <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-gray-900 text-sm">Featured Products</h3><button onClick={() => navigateTo('search')} className="text-xs text-green-600 font-medium">See All</button></div>
        <div className="grid grid-cols-2 gap-3">{products.slice(0, 6).map(product => (<ProductCard key={product.id} product={product} onTap={() => navigateTo('productDetail')} />))}</div>
      </div>
    </div>
  );
}

export function SearchScreen({ navigateTo }: { navigateTo: (s: AppScreen) => void }) {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const allCats = ['All', ...categories.map(c => c.name)];
  const results = products.filter(p => {
    const matchName = p.name.toLowerCase().includes(query.toLowerCase());
    const matchCat = selectedCat === 'All' || p.category === selectedCat;
    return matchName && matchCat;
  });
  return (
    <div className="p-4">
      <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
        <MagnifyingGlass size={18} className="text-gray-400" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search produce, farmers..." className="bg-transparent text-sm flex-1 outline-none text-gray-900 placeholder:text-gray-400" autoFocus />
        {query && <button onClick={() => setQuery('')}><X size={16} className="text-gray-400" /></button>}
      </div>
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
        {allCats.map(cat => (
          <button key={cat} onClick={() => setSelectedCat(cat)} className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedCat === cat ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{cat}</button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">{results.map(product => (<ProductCard key={product.id} product={product} onTap={() => navigateTo('productDetail')} />))}</div>
      {results.length === 0 && <div className="mt-12 text-center text-gray-400 text-sm">No products found</div>}
    </div>
  );
}