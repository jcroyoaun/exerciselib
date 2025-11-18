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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Manage Library Data</h2>
            <p className="text-sm text-slate-500 mt-0.5">Configure muscles and movement patterns</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="flex gap-2 px-6 py-3 border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab('muscles')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'muscles'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            Muscles
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'patterns'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4" />
            Movement Patterns
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'muscles' && <MusclesView />}
          {activeTab === 'patterns' && <MovementPatternsView />}
        </div>
      </div>
    </div>
  );
}
