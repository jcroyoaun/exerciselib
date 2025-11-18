import { useState } from 'react';
import { Dumbbell, Zap, Target } from 'lucide-react';
import { ExercisesView } from './views/ExercisesView';
import { MusclesView } from './views/MusclesView';
import { MovementPatternsView } from './views/MovementPatternsView';

type View = 'exercises' | 'muscles' | 'patterns';

function App() {
  const [activeView, setActiveView] = useState<View>('exercises');

  const tabs = [
    { id: 'exercises' as View, label: 'Exercises', icon: Dumbbell },
    { id: 'muscles' as View, label: 'Muscles', icon: Zap },
    { id: 'patterns' as View, label: 'Movement Patterns', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Exercise Library</h1>
              <p className="text-slate-600 mt-1">
                Comprehensive database of exercises, muscles, and movement patterns
              </p>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50">
            <nav className="flex gap-2 px-6 py-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeView === 'exercises' && <ExercisesView />}
            {activeView === 'muscles' && <MusclesView />}
            {activeView === 'patterns' && <MovementPatternsView />}
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-slate-500">
          <p>Exercise Library API v1.0.0</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
