import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Award, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  BarChart3, 
  HelpCircle, 
  Bot, 
  CheckCircle2, 
  TrendingUp,
  PlayCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Badge } from '../../components/ui/Badge';

export const DashboardPage: React.FC = () => {
  const { user, learningModules, skillGaps, setActivePage, addChatMessage } = useApp();

  const handleQuickQuestion = (promptText: string) => {
    addChatMessage(promptText, 'user');
    setActivePage('chatbot');
  };

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-800 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-brand-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              Inclusive AI Learning Hub
            </span>
            <Badge variant="neutral" className="bg-black/30 border-none text-white text-[10px]">Dev 2 Module</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="mt-2 text-sm sm:text-base text-brand-100 leading-relaxed">
            Your personalized curriculum is optimized for <strong>{user.targetRole}</strong>. You're on a <strong>{user.streakDays}-day streak</strong>!
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="accent"
              size="md"
              onClick={() => setActivePage('quiz')}
              icon={<HelpCircle className="w-4 h-4" />}
            >
              Start Diagnostic Quiz
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => setActivePage('learning')}
              className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
              icon={<BookOpen className="w-4 h-4" />}
            >
              Resume Learning Path
            </Button>
          </div>
        </div>

        {/* Floating Decorative Shape */}
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-x-12 translate-y-8">
          <Award className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Top 4 Stat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Skill Readiness"
          value={`${user.skillReadinessScore}%`}
          subtitle="Target Role: AI Engineer"
          icon={<Award className="w-6 h-6" />}
          trend="+5% this week"
          trendPositive={true}
          iconBg="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
        />
        <StatCard
          title="Learning Streak"
          value={`${user.streakDays} Days`}
          subtitle="Daily Goal: 30 mins"
          icon={<Flame className="w-6 h-6" />}
          trend="Top 10% of learners"
          trendPositive={true}
          iconBg="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
        />
        <StatCard
          title="Completed Modules"
          value={user.completedModules}
          subtitle="Across 3 Core Paths"
          icon={<BookOpen className="w-6 h-6" />}
          trend="2 completed this month"
          trendPositive={true}
          iconBg="bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
        />
        <StatCard
          title="Study Hours"
          value={`${user.totalStudyHours} hrs`}
          subtitle="Audio & Video Lessons"
          icon={<Clock className="w-6 h-6" />}
          trend="4.5 hrs this week"
          trendPositive={true}
          iconBg="bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
        />
      </div>

      {/* Main Grid: Active Modules + Skill Gap Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Modules & Path */}
        <div className="lg:col-span-8 space-y-6">
          <Card hoverEffect={false}>
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-600" />
                  Continue Learning Pathways
                </CardTitle>
                <button
                  onClick={() => setActivePage('learning')}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer"
                >
                  View All Paths <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </CardHeader>

            <div className="space-y-4">
              {learningModules.map((module) => (
                <div
                  key={module.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1.5 grow">
                    <div className="flex items-center gap-2">
                      <Badge variant={module.status === 'completed' ? 'success' : module.status === 'in-progress' ? 'brand' : 'warning'}>
                        {module.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {module.category} • {module.duration}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {module.title}
                    </h4>
                    <ProgressBar value={module.progress} size="sm" color={module.progress === 100 ? 'emerald' : 'brand'} />
                  </div>

                  <Button
                    variant={module.status === 'completed' ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => setActivePage('learning')}
                    icon={<PlayCircle className="w-4 h-4" />}
                    className="shrink-0"
                  >
                    {module.status === 'completed' ? 'Review' : 'Continue'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick AI Assistant Prompts Box */}
          <Card className="bg-gradient-to-r from-brand-50 to-indigo-50 dark:from-slate-800 dark:to-brand-950/40 border-brand-200 dark:border-brand-800">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-600 rounded-xl text-white shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <div className="grow">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Ask EduBridge AI Assistant
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Need a topic explained simply, step-by-step code, or dyslexic summary notes? Click below:
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleQuickQuestion('Explain PyTorch tensors with a visual analogy')}
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-brand-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-brand-700 dark:text-brand-300 hover:border-brand-400 shadow-xs cursor-pointer"
                  >
                    💡 "Explain PyTorch tensors simply"
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('How do I build accessible React forms?')}
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-brand-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-brand-700 dark:text-brand-300 hover:border-brand-400 shadow-xs cursor-pointer"
                  >
                    ♿ "Accessible React form tips"
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Skill Gap Snapshot & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="w-5 h-5 text-amber-500" />
                  Skill Gap Snapshot
                </CardTitle>
                <button
                  onClick={() => setActivePage('skill-gap')}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
                >
                  Full Analysis →
                </button>
              </div>
            </CardHeader>

            <div className="space-y-4">
              {skillGaps.slice(0, 3).map((item) => (
                <div key={item.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
                    <span>{item.skillName}</span>
                    <span className="text-slate-500">{item.currentLevel}% / {item.targetLevel}%</span>
                  </div>
                  <ProgressBar
                    value={item.currentLevel}
                    size="sm"
                    showPercentage={false}
                    color={item.gapSeverity === 'High' ? 'rose' : item.gapSeverity === 'Medium' ? 'amber' : 'emerald'}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Diagnostic Quiz Card */}
          <Card className="border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-600 text-white rounded-lg">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Ready for a Quick Assessment?
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
              5 short diagnostic questions to update your readiness score and adapt your weekly goals.
            </p>
            <Button
              variant="accent"
              size="sm"
              className="w-full"
              onClick={() => setActivePage('quiz')}
            >
              Take Quiz Now (5 mins)
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
