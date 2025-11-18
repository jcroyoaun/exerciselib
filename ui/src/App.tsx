import { useState } from 'react';
import { Terminal, Settings } from 'lucide-react';
import { ExercisesView } from './views/ExercisesView';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="h-screen flex flex-col">
        <header className="bg-slate-900 border-b-2 border-cyan-500/50 shadow-lg shadow-cyan-500/10">
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-cyan-500 border-2 border-cyan-300">
                  <Terminal className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-2xl font-mono font-bold text-cyan-400 tracking-tight">
                    &gt; EXERCISE_LIBRARY.EXE
                  </h1>
                  <p className="text-sm font-mono text-slate-500">
                    // your workout database
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-cyan-500/30 text-cyan-400 hover:bg-slate-700 hover:border-cyan-500/50 transition-all font-mono text-sm"
              >
                <Settings className="w-4 h-4" />
                <span>[ SETTINGS ]</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden bg-slate-950">
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
