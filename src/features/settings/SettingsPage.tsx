import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Eye, 
  Volume2, 
  Bell, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Type, 
  Check, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const SettingsPage: React.FC = () => {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    isHighContrast, 
    toggleHighContrast, 
    isDyslexicFont, 
    toggleDyslexicFont,
    fontSize,
    setFontSize
  } = useApp();

  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    quizAlerts: true,
    mentorUpdates: true,
    aiSuggestions: true,
  });

  const [audioSpeed, setAudioSpeed] = useState<'1.0x' | '1.25x' | '1.5x'>('1.0x');
  const [ttsEnabled, setTtsEnabled] = useState(true);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Platform Settings & Accessibility
            </h2>
            <Badge variant="neutral" className="text-[10px]">Dev 1 Module</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Personalize visual themes, neurodivergent font features, screen reader assistance, and notifications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual & Theme Customization */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sun className="w-5 h-5 text-amber-500" />
              Theme & Visual Preferences
            </CardTitle>
          </CardHeader>

          {/* Dark Mode */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Dark Mode</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Reduce eye strain during night learning sessions</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isDarkMode ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">High Contrast Mode</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Maximum color contrast for low vision users</p>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isHighContrast
                  ? 'bg-amber-500 text-black font-extrabold shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isHighContrast ? 'ACTIVE' : 'OFF'}
            </button>
          </div>

          {/* Dyslexia Font Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-brand-600" />
                OpenDyslexic Font
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Specially weighted font for easier character distinction</p>
            </div>
            <button
              onClick={toggleDyslexicFont}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isDyslexicFont
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isDyslexicFont ? 'ACTIVE' : 'OFF'}
            </button>
          </div>

          {/* Font Scaling */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Typography Font Scaling</p>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              <button
                onClick={() => setFontSize('normal')}
                className={`py-2 rounded-lg border cursor-pointer ${
                  fontSize === 'normal' ? 'border-brand-600 bg-brand-50 dark:bg-brand-950 text-brand-600' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                Normal (100%)
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`py-2 rounded-lg border cursor-pointer ${
                  fontSize === 'large' ? 'border-brand-600 bg-brand-50 dark:bg-brand-950 text-brand-600' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                Large (115%)
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`py-2 rounded-lg border cursor-pointer ${
                  fontSize === 'xlarge' ? 'border-brand-600 bg-brand-50 dark:bg-brand-950 text-brand-600' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                X-Large (130%)
              </button>
            </div>
          </div>
        </Card>

        {/* Audio Assistance & Screen Reader Tools */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Volume2 className="w-5 h-5 text-emerald-500" />
              Speech & Audio Support
            </CardTitle>
          </CardHeader>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Text-To-Speech (TTS) Reader</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Read quiz questions and lesson explanations aloud</p>
            </div>
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                ttsEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {ttsEnabled ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">TTS Playback Speed</p>
            <div className="flex gap-2 text-xs font-bold">
              {(['1.0x', '1.25x', '1.5x'] as const).map(speed => (
                <button
                  key={speed}
                  onClick={() => setAudioSpeed(speed)}
                  className={`flex-1 py-1.5 rounded-lg border cursor-pointer ${
                    audioSpeed === speed
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <CardHeader className="pt-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="w-5 h-5 text-sky-500" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <div className="space-y-2 text-xs font-medium">
            {Object.entries(notifications).map(([key, val]) => (
              <label key={key} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 cursor-pointer">
                <span className="capitalize text-slate-700 dark:text-slate-300">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <input
                  type="checkbox"
                  checked={val}
                  onChange={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
