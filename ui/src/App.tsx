import { useState } from 'react';
import { Terminal, Settings } from 'lucide-react';
import { ExercisesView } from './views/ExercisesView';
import { SettingsModal } from './components/SettingsModal';
import { useTheme, themes, type Theme } from './ThemeContext';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const { theme: currentTheme, setTheme: setCurrentTheme, themeColors } = useTheme();

  return (
    <div className={`min-h-screen ${themeColors.bg}`} data-theme={currentTheme}>
      <div className="h-screen flex flex-col">
        <header className={`${themeColors.bgSecondary} border-b-4 ${themeColors.border} shadow-lg ${themeColors.shadow}`}>
          <div className="max-w-[1920px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 ${themeColors.accent} border-2 ${themeColors.border}`}>
                  <Terminal className={`w-6 h-6 ${themeColors.iconBg}`} />
                </div>
                <div>
                  <h1 className={`text-2xl font-mono font-bold ${themeColors.text} tracking-tight`}>
                    &gt; EXERCISE_LIBRARY.EXE
                  </h1>
                  <p className="text-sm font-mono text-neutral-500">
                    // your workout database
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {(Object.keys(themes) as Theme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setCurrentTheme(t)}
                      className={`w-8 h-8 border-2 ${themes[t].border} ${themes[t].accent} ${currentTheme === t ? 'ring-2 ring-white' : ''} transition-all`}
                      title={t.toUpperCase()}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setShowSettings(true)}
                  className={`flex items-center gap-2 px-4 py-2 ${themeColors.bgTertiary} border-2 ${themeColors.border} ${themeColors.text} ${themeColors.textHover} transition-all font-mono text-sm`}
                >
                  <Settings className="w-4 h-4" />
                  <span>[ SETTINGS ]</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className={`flex-1 overflow-hidden ${themeColors.bg}`}>
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
