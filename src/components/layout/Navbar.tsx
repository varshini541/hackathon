import React from 'react';
import { 
  Menu, 
  Sun, 
  Moon, 
  Eye, 
  Type, 
  Zap, 
  Sparkles,
  Flame,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { 
    activePage, 
    user, 
    isDarkMode, 
    toggleDarkMode, 
    isHighContrast, 
    toggleHighContrast, 
    isDyslexicFont, 
    toggleDyslexicFont,
    fontSize,
    setFontSize
  } = useApp();

  const pageTitles: Record<string, { title: string; desc: string }> = {
    dashboard: { title: 'Student Dashboard', desc: 'Welcome back! Track your learning journey and streak.' },
    quiz: { title: 'Diagnostic Quiz Engine', desc: 'Assess your strengths and pinpoint knowledge gaps.' },
    'skill-gap': { title: 'Skill Gap Analysis', desc: 'Visualize your competencies against industry job target roles.' },
    learning: { title: 'Personalized Pathways', desc: 'AI-recommended bite-sized modules tailored to your goals.' },
    career: { title: 'Career Guidance & Insights', desc: 'Explore tech roles, salary data, and competency roadmaps.' },
    chatbot: { title: 'AI Tutor Assistant', desc: 'Ask questions, get simple explanations, and step-by-step code guidance.' },
    mentorship: { title: 'Mentorship & Peer Network', desc: 'Connect with verified industry mentors for 1-on-1 advice.' },
    onboarding: { title: 'Student Profile & Goals', desc: 'Update learning preferences, background, and accommodations.' },
    settings: { title: 'Settings & Accessibility', desc: 'Customize theme, font styles, screen-reader helper, and privacy.' },
    login: { title: 'Authentication Portal', desc: 'Sign in to access your inclusive learning workspace.' }
  };

  const currentInfo = pageTitles[activePage] || { title: 'EduBridge Platform', desc: 'Inclusive AI Education' };

  const handleNextFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            {currentInfo.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            {currentInfo.desc}
          </p>
        </div>
      </div>

      {/* Right side accessibility toolbar & user metrics */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Counter Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-full text-xs font-bold shadow-xs">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>{user.streakDays} Day Streak</span>
        </div>

        {/* Readiness Score Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-full text-xs font-bold shadow-xs">
          <Award className="w-4 h-4 text-emerald-500" />
          <span>{user.skillReadinessScore}% Readiness</span>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

        {/* Accessibility Toolbar */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          {/* Dyslexic Font Toggle */}
          <button
            onClick={toggleDyslexicFont}
            title={isDyslexicFont ? 'Disable Dyslexic Font' : 'Enable Dyslexic-Friendly Font'}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isDyslexicFont
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-brand-600'
            }`}
          >
            <Type className="w-4 h-4" />
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            title={isHighContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isHighContrast
                ? 'bg-amber-500 text-black shadow-xs font-extrabold'
                : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Font Size Toggle */}
          <button
            onClick={handleNextFontSize}
            title={`Font Size: ${fontSize.toUpperCase()} (Click to change)`}
            className="px-2 py-1 text-xs font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all cursor-pointer"
          >
            {fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
