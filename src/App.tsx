import { useState } from 'react';
import MobileFrame from './components/MobileFrame';
import { ViewMode } from './types';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[3px] border-gray-900">
        <MobileFrame viewMode={viewMode} setViewMode={setViewMode} />
      </div>
    </div>
  );
}

export default App;