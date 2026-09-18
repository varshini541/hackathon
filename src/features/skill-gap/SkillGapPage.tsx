import React, { useState } from 'react';
import { 
  BarChart3, 
  Target, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Layers,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';

export const SkillGapPage: React.FC = () => {
  const { skillGaps, user, setActivePage } = useApp();
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredGaps = filterSeverity === 'all'
    ? skillGaps
    : skillGaps.filter(g => g.gapSeverity.toLowerCase() === filterSeverity.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Skill Gap Matrix & Analysis
            </h2>
            <Badge variant="neutral" className="text-[10px]">Dev 3 Module</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comparing your real-time diagnostic performance against target competency requirements for <strong>{user.targetRole}</strong>.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setActivePage('learning')}
          icon={<BookOpen className="w-4 h-4" />}
        >
          View Recommended Modules
        </Button>
      </div>

      {/* Target Competency Overview Banner */}
      <Card className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-none shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Target Job Role</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              {user.targetRole}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Industry demand expects proficiency in deep learning frameworks, async web architectures, and containerization.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center border border-white/10 shrink-0">
            <p className="text-xs font-semibold text-slate-300 uppercase">Overall Gap Index</p>
            <p className="text-3xl font-extrabold text-amber-400 mt-1">22% Gap</p>
            <p className="text-[11px] text-emerald-300 mt-0.5">78% Readiness Score</p>
          </div>
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs font-bold text-slate-500 uppercase mr-1 shrink-0">Filter Severity:</span>
          {(['all', 'high', 'medium', 'low'] as const).map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer shrink-0 ${
                filterSeverity === sev
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Gaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGaps.map(item => {
          const gapDiff = item.targetLevel - item.currentLevel;

          return (
            <Card key={item.id} hoverEffect className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="neutral" className="text-[10px] mb-1">
                    {item.category}
                  </Badge>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {item.skillName}
                  </h4>
                </div>
                <Badge
                  variant={item.gapSeverity === 'High' ? 'danger' : item.gapSeverity === 'Medium' ? 'warning' : 'success'}
                >
                  {item.gapSeverity} Gap
                </Badge>
              </div>

              {/* Progress comparison */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Current Proficiency: {item.currentLevel}%</span>
                  <span className="text-brand-600 dark:text-brand-400">Target: {item.targetLevel}%</span>
                </div>
                <ProgressBar
                  value={item.currentLevel}
                  size="md"
                  color={item.gapSeverity === 'High' ? 'rose' : item.gapSeverity === 'Medium' ? 'amber' : 'emerald'}
                  showPercentage={false}
                />
              </div>

              {/* Recommended Courses to bridge */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                  Recommended Bridge Courses:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.recommendedCourses.map((c, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setActivePage('learning')}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Bridge This Gap Now
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
