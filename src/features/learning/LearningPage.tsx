import React, { useState } from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle2, 
  Lock, 
  Clock, 
  FileText, 
  Sparkles, 
  Check, 
  ArrowRight,
  Bookmark,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';

export const LearningPage: React.FC = () => {
  const { learningModules, updateModuleProgress, user } = useApp();
  const [selectedModule, setSelectedModule] = useState<typeof learningModules[0] | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');

  const filteredModules = activeTab === 'all'
    ? learningModules
    : learningModules.filter(m => m.status === activeTab);

  const handleOpenModule = (mod: typeof learningModules[0]) => {
    setSelectedModule(mod);
    setIsPlayerOpen(true);
  };

  const handleToggleLesson = (lessonId: string) => {
    if (!selectedModule) return;
    const totalLessons = selectedModule.lessons.length;
    const completedCount = selectedModule.lessons.filter(l => l.id === lessonId ? !l.completed : l.completed).length;
    const newProgress = Math.round((completedCount / totalLessons) * 100);
    
    updateModuleProgress(selectedModule.id, newProgress);

    // Update local state for modal display
    setSelectedModule(prev => prev ? {
      ...prev,
      progress: newProgress,
      lessons: prev.lessons.map(l => l.id === lessonId ? { ...l, completed: !l.completed } : l)
    } : null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Personalized Learning Path
            </h2>
            <Badge variant="neutral" className="text-[10px]">Dev 3 Module</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Bite-sized, accessible modules structured dynamically based on your diagnostic results.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          {(['all', 'in-progress', 'completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Roadmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((module) => {
          const isLocked = module.status === 'locked';

          return (
            <Card key={module.id} hoverEffect={!isLocked} className={isLocked ? 'opacity-70 bg-slate-50 dark:bg-slate-900/50' : ''}>
              <div className="flex justify-between items-start mb-3">
                <Badge variant={module.status === 'completed' ? 'success' : module.status === 'in-progress' ? 'brand' : isLocked ? 'neutral' : 'warning'}>
                  {module.status.toUpperCase()}
                </Badge>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {module.duration}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {module.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {module.description}
              </p>

              <div className="mb-4">
                <ProgressBar value={module.progress} color={module.progress === 100 ? 'emerald' : 'brand'} size="sm" />
              </div>

              {/* AI Dyslexic Summary Notes Preview */}
              <div className="p-3 bg-brand-50/50 dark:bg-brand-950/40 rounded-xl border border-brand-100 dark:border-brand-900 mb-4 space-y-1">
                <p className="text-[11px] font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  AI Summary Note:
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "{module.aiSummary}"
                </p>
              </div>

              <Button
                variant={isLocked ? 'secondary' : 'primary'}
                className="w-full"
                disabled={isLocked}
                onClick={() => handleOpenModule(module)}
                icon={isLocked ? <Lock className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
              >
                {isLocked ? 'Locked (Complete prerequisite)' : module.status === 'completed' ? 'Review Lesson Material' : 'Launch Module Player'}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Interactive Lesson Player Modal Mockup */}
      {selectedModule && (
        <Modal
          isOpen={isPlayerOpen}
          onClose={() => setIsPlayerOpen(false)}
          title={`Lesson Player: ${selectedModule.title}`}
          footer={
            <Button variant="primary" onClick={() => setIsPlayerOpen(false)}>
              Done & Save Progress
            </Button>
          }
        >
          <div className="space-y-4">
            {/* Video Player Placeholder */}
            <div className="w-full aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <PlayCircle className="w-16 h-16 text-brand-400 group-hover:scale-110 transition-transform relative z-10 cursor-pointer" />
              <p className="text-sm font-bold mt-2 relative z-10">Bite-sized Interactive Video & Audio Demo</p>
              <p className="text-xs text-slate-400 relative z-10">Duration: {selectedModule.duration}</p>
            </div>

            {/* AI Audio Transcript button */}
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Text-To-Speech Audio Companion
              </span>
              <Button size="sm" variant="outline" icon={<Volume2 className="w-4 h-4 text-brand-600" />}>
                Listen Audio (1.0x)
              </Button>
            </div>

            {/* Lessons Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Lessons in this Module
              </h4>
              {selectedModule.lessons.map(les => (
                <div
                  key={les.id}
                  onClick={() => handleToggleLesson(les.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    les.completed
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 text-emerald-900 dark:text-emerald-200'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      les.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {les.completed && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-bold">{les.title}</span>
                  </div>
                  <span className="text-xs text-slate-400">{les.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
