import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Target, 
  Sparkles, 
  Check, 
  Sliders, 
  Volume2, 
  Eye, 
  Clock, 
  Save,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const ProfilePage: React.FC = () => {
  const { user, setUser, setActivePage } = useApp();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    institution: user.institution,
    educationLevel: user.educationLevel,
    targetRole: user.targetRole,
    learningStyles: [...user.learningStyles],
    accommodations: [...user.accommodations],
    bio: user.bio,
  });

  const availableStyles = [
    'Visual Learner',
    'Hands-on Coding',
    'Bite-Sized Lessons',
    'Audio Explanations',
    'Text Summaries',
    'Gamified Quizzes'
  ];

  const availableAccommodations = [
    'Dyslexic-friendly Font',
    'Audio Explanation Support',
    'High Contrast Theme',
    'Reduced Motion',
    'Extended Quiz Timer (+50%)',
    'Screen Reader Friendly ARIA'
  ];

  const toggleStyle = (style: string) => {
    setForm(prev => ({
      ...prev,
      learningStyles: prev.learningStyles.includes(style)
        ? prev.learningStyles.filter(s => s !== style)
        : [...prev.learningStyles, style]
    }));
  };

  const toggleAccommodation = (acc: string) => {
    setForm(prev => ({
      ...prev,
      accommodations: prev.accommodations.includes(acc)
        ? prev.accommodations.filter(a => a !== acc)
        : [...prev.accommodations, acc]
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: form.name,
      institution: form.institution,
      educationLevel: form.educationLevel,
      targetRole: form.targetRole,
      learningStyles: form.learningStyles,
      accommodations: form.accommodations,
      bio: form.bio,
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-brand-500/20 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {user.name}
              </h2>
              <Badge variant="brand">Student</Badge>
              <Badge variant="neutral" className="text-[10px]">Dev 1 Module</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {user.institution} • {user.educationLevel}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setActivePage('dashboard')}>
            Back to Dashboard
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-xl text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <Check className="w-5 h-5 text-emerald-500" />
          <span>Profile & learning preferences updated successfully!</span>
        </div>
      )}

      {/* Onboarding Step Tracker */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setActiveStep(1)}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeStep === 1
              ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/60 ring-2 ring-brand-500/20'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <p className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Step 1</p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Personal & Academic Info</p>
        </button>
        <button
          onClick={() => setActiveStep(2)}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeStep === 2
              ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/60 ring-2 ring-brand-500/20'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <p className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Step 2</p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Learning Styles & Goals</p>
        </button>
        <button
          onClick={() => setActiveStep(3)}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeStep === 3
              ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/60 ring-2 ring-brand-500/20'
              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <p className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Step 3</p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Accommodations & A11y</p>
        </button>
      </div>

      <form onSubmit={handleSave}>
        {/* Step 1: Basic Info */}
        {activeStep === 1 && (
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Academic Background & Bio</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  University / Institution
                </label>
                <input
                  type="text"
                  value={form.institution}
                  onChange={e => setForm({ ...form, institution: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Education Level
                </label>
                <select
                  value={form.educationLevel}
                  onChange={e => setForm({ ...form, educationLevel: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                >
                  <option value="High School">High School</option>
                  <option value="Undergraduate (1st Year)">Undergraduate (1st Year)</option>
                  <option value="Undergraduate (2nd Year)">Undergraduate (2nd Year)</option>
                  <option value="Undergraduate (3rd/4th Year)">Undergraduate (3rd/4th Year)</option>
                  <option value="Postgraduate / Master's">Postgraduate / Master's</option>
                  <option value="Self-Taught / Bootcamp">Self-Taught / Bootcamp</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Career Role
                </label>
                <input
                  type="text"
                  value={form.targetRole}
                  onChange={e => setForm({ ...form, targetRole: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-brand-600 dark:text-brand-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Student Bio & Learning Goals
              </label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>
            
            <div className="flex justify-end pt-2">
              <Button type="button" onClick={() => setActiveStep(2)}>Next: Learning Styles →</Button>
            </div>
          </Card>
        )}

        {/* Step 2: Learning Styles */}
        {activeStep === 2 && (
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>How Do You Learn Best?</CardTitle>
            </CardHeader>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select all learning formats that help you retain information efficiently. EduBridge AI will prioritize these content formats.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableStyles.map(style => {
                const selected = form.learningStyles.includes(style);
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => toggleStyle(style)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selected
                        ? 'border-brand-600 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs">{style}</span>
                    {selected && <Check className="w-4 h-4 text-brand-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="secondary" onClick={() => setActiveStep(1)}>← Previous</Button>
              <Button type="button" onClick={() => setActiveStep(3)}>Next: Accommodations →</Button>
            </div>
          </Card>
        )}

        {/* Step 3: Accommodations & A11y */}
        {activeStep === 3 && (
          <Card className="space-y-4">
            <CardHeader>
              <CardTitle>Inclusive Accommodations & Accessibility</CardTitle>
            </CardHeader>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              EduBridge is built with neurodiversity and inclusion at its core. Select accommodations you need during diagnostic quizzes and lessons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableAccommodations.map(acc => {
                const selected = form.accommodations.includes(acc);
                return (
                  <button
                    key={acc}
                    type="button"
                    onClick={() => toggleAccommodation(acc)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selected
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs">{acc}</span>
                    {selected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="secondary" onClick={() => setActiveStep(2)}>← Previous</Button>
              <Button type="submit" variant="accent" icon={<Save className="w-4 h-4" />}>Save & Apply Profile</Button>
            </div>
          </Card>
        )}
      </form>
    </div>
  );
};
