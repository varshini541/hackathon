import React from 'react';
import { 
  LayoutDashboard, 
  HelpCircle, 
  BarChart3, 
  BookOpen, 
  Briefcase, 
  Bot, 
  Users, 
  Settings as SettingsIcon, 
  UserCheck, 
  LogIn,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { useApp, PageId } from '../../context/AppContext';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
  devTag: string; // Shows sub-team owner tag for modular clarity
}

export const Sidebar: React.FC<{ isOpen: boolean; onCloseMobile: () => void }> = ({ isOpen, onCloseMobile }) => {
  const { activePage, setActivePage, user } = useApp();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, devTag: 'Dev 2' },
    { id: 'quiz', label: 'Diagnostic Quiz', icon: <HelpCircle className="w-5 h-5" />, devTag: 'Dev 2' },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: <BarChart3 className="w-5 h-5" />, devTag: 'Dev 3' },
    { id: 'learning', label: 'Personalized Path', icon: <BookOpen className="w-5 h-5" />, devTag: 'Dev 3' },
    { id: 'career', label: 'Career Guidance', icon: <Briefcase className="w-5 h-5" />, devTag: 'Dev 4' },
    { id: 'chatbot', label: 'AI Tutor Chat', icon: <Bot className="w-5 h-5" />, devTag: 'Dev 4' },
    { id: 'mentorship', label: 'Mentorship Network', icon: <Users className="w-5 h-5" />, devTag: 'Dev 4' },
    { id: 'onboarding', label: 'Student Profile', icon: <UserCheck className="w-5 h-5" />, devTag: 'Dev 1' },
    { id: 'settings', label: 'Settings & A11y', icon: <SettingsIcon className="w-5 h-5" />, devTag: 'Dev 1' },
    { id: 'login', label: 'Login / Register', icon: <LogIn className="w-5 h-5" />, devTag: 'Dev 1' },
  ];

  const handleSelect = (id: PageId) => {
    setActivePage(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="h-16 px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-600 rounded-xl text-white shadow-md shadow-brand-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                EduBridge
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              </span>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Inclusive AI Platform
              </p>
            </div>
          </div>
        </div>

        {/* Navigation items list */}
        <div className="grow px-4 py-4 overflow-y-auto space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Main Navigation
          </p>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold shadow-sm border border-brand-200/60 dark:border-brand-800'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
                  {item.devTag}
                </span>
              </button>
            );
          })}
        </div>

        {/* User Mini Profile Card at Bottom */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-950/30">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/30"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                {user.name}
              </p>
              <p className="text-xs text-brand-600 dark:text-brand-400 truncate font-medium">
                {user.targetRole}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
