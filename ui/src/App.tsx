import { useState } from 'react';
import { Dumbbell, Settings } from 'lucide-react';
import { ExercisesView } from './views/ExercisesView';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="h-screen flex flex-col">
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">My Exercise Library</h1>
                  <p className="text-sm text-slate-500">Your workout catalog</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
              >
                <Settings className="w-5 h-5" />
                <span className="text-sm font-medium">Manage Data</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">
          <ExercisesView />
        </main>
      </div>

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

export default App;
