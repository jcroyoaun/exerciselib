import { useState } from 'react';
import { Terminal, Settings } from 'lucide-react';
import { ExercisesView } from './views/ExercisesView';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="h-screen flex flex-col">
        <header className="bg-yellow-100 border-b-4 border-orange-600 shadow-lg">
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-600 border-4 border-orange-800">
                  <Terminal className="w-6 h-6 text-yellow-50" />
                </div>
                <div>
                  <h1 className="text-2xl font-mono font-bold text-orange-900 tracking-tight">
                    &gt; EXERCISE_LIBRARY.EXE
                  </h1>
                  <p className="text-sm font-mono text-amber-700">
                    // your workout database
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-100 border-2 border-orange-600 text-orange-900 hover:bg-amber-200 hover:border-orange-700 transition-all font-mono text-sm"
              >
                <Settings className="w-4 h-4" />
                <span>[ SETTINGS ]</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden bg-amber-50">
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
