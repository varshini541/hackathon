import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Sidebar 
        isOpen={isMobileSidebarOpen} 
        onCloseMobile={() => setIsMobileSidebarOpen(false)} 
      />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Navbar onOpenMobileMenu={() => setIsMobileSidebarOpen(true)} />

        <main className="grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        <footer className="py-6 px-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
            <p>© 2026 EduBridge — Empowering Inclusive AI Education for All Learners.</p>
            <div className="flex gap-4 font-medium text-slate-600 dark:text-slate-400">
              <span className="hover:text-brand-600 cursor-pointer">Accessibility (WCAG 2.1)</span>
              <span>•</span>
              <span className="hover:text-brand-600 cursor-pointer">Privacy & Ethics</span>
              <span>•</span>
              <span className="hover:text-brand-600 cursor-pointer">Hackathon Edition</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
