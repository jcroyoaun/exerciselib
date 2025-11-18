import { useState } from 'react';
import { X, Zap, Target } from 'lucide-react';
import { MusclesView } from '../views/MusclesView';
import { MovementPatternsView } from '../views/MovementPatternsView';

interface SettingsModalProps {
  onClose: () => void;
}

type Tab = 'muscles' | 'patterns';

export function SettingsModal({ onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('muscles');

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-yellow-100 border-4 border-orange-800 shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b-4 border-orange-800 bg-orange-600">
          <div>
            <h2 className="text-2xl font-mono font-bold text-yellow-50">[ MANAGE LIBRARY DATA ]</h2>
            <p className="text-sm font-mono text-orange-200 mt-0.5">// configure muscles and movement patterns</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-700 transition-colors"
          >
            <X className="w-5 h-5 text-yellow-50" />
          </button>
        </div>

        <div className="flex gap-2 px-6 py-3 border-b-2 border-orange-600 bg-yellow-200">
          <button
            onClick={() => setActiveTab('muscles')}
            className={`flex items-center gap-2 px-4 py-2 font-mono font-bold text-sm transition-all uppercase tracking-wider ${
              activeTab === 'muscles'
                ? 'bg-orange-600 text-yellow-50 border-2 border-orange-800'
                : 'text-orange-900 hover:bg-amber-100 border-2 border-orange-600'
            }`}
          >
            <Zap className="w-4 h-4" />
            Muscles
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`flex items-center gap-2 px-4 py-2 font-mono font-bold text-sm transition-all uppercase tracking-wider ${
              activeTab === 'patterns'
                ? 'bg-orange-600 text-yellow-50 border-2 border-orange-800'
                : 'text-orange-900 hover:bg-amber-100 border-2 border-orange-600'
            }`}
          >
            <Target className="w-4 h-4" />
            Movement Patterns
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-amber-50">
          {activeTab === 'muscles' && <MusclesView />}
          {activeTab === 'patterns' && <MovementPatternsView />}
        </div>
      </div>
    </div>
  );
}
