import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Accessibility
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const AuthPage: React.FC = () => {
  const { setActivePage, isDyslexicFont, toggleDyslexicFont, isHighContrast, toggleHighContrast } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'student' | 'educator' | 'mentor'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: 'alex.rivera@university.edu',
    password: '••••••••',
    institution: 'Metropolitan Tech University'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Move to dashboard after login
    setActivePage('dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="text-center mb-8">
        <Badge variant="brand" className="mb-3">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500 inline" />
          Independent Module: Dev 1
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Welcome to EduBridge
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto text-sm">
          An inclusive, AI-powered learning workspace designed for neurodivergent, diverse, and ambitious learners worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Product Features & Accessibility Highlights */}
        <div className="md:col-span-5 space-y-6">
          <Card className="bg-gradient-to-br from-brand-600 to-brand-800 text-white border-none shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-white">Why EduBridge?</h3>
            </div>
            <ul className="space-y-3.5 text-sm text-brand-100">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                <span><strong>AI Diagnostic Assessments</strong> that tailor curriculum to your true cognitive strengths.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                <span><strong>Built-in Accessibility</strong> for dyslexia, low vision, and focus preferences.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                <span><strong>Skill Gap & Career Roadmap</strong> direct linkage to top tech industries.</span>
              </li>
            </ul>
          </Card>

          {/* Quick Accessibility Mode Toggle Card */}
          <Card>
            <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-white font-bold text-sm">
              <Accessibility className="w-4 h-4 text-brand-600" />
              <span>Accessibility Quick Controls</span>
            </div>
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Dyslexic-Friendly Font</span>
                <input 
                  type="checkbox" 
                  checked={isDyslexicFont} 
                  onChange={toggleDyslexicFont}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4" 
                />
              </label>
              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800 cursor-pointer">
                <span className="text-slate-700 dark:text-slate-300 font-medium">High Contrast Mode</span>
                <input 
                  type="checkbox" 
                  checked={isHighContrast} 
                  onChange={toggleHighContrast}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4" 
                />
              </label>
            </div>
          </Card>
        </div>

        {/* Right Side: Auth Form Card */}
        <div className="md:col-span-7">
          <Card className="shadow-md">
            {/* Header Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
                  isLogin
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors cursor-pointer ${
                  !isLogin
                    ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Role Switcher */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    selectedRole === 'student'
                      ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 text-brand-600" />
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('educator')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    selectedRole === 'educator'
                      ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span>Educator</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('mentor')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    selectedRole === 'mentor'
                      ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Users className="w-5 h-5 text-amber-600" />
                  <span>Mentor</span>
                </button>
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Rivera"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2" icon={<ArrowRight className="w-4 h-4" />}>
                {isLogin ? 'Sign In to Dashboard' : 'Create Free Student Account'}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActivePage('dashboard')}
                className="w-full text-xs text-brand-600 dark:text-brand-400"
              >
                🚀 Skip & Explore with Demo Profile (Hackathon Mode)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
