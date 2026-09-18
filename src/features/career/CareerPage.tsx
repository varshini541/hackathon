import React from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Target, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const CareerPage: React.FC = () => {
  const { careerRoles, user, setUser, setActivePage } = useApp();

  const handleSetTargetRole = (roleTitle: string) => {
    setUser(prev => ({ ...prev, targetRole: roleTitle }));
    alert(`Target role updated to "${roleTitle}"! Your dashboard & learning paths have adjusted.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Career Guidance & Pathways
            </h2>
            <Badge variant="neutral" className="text-[10px]">Dev 4 Module</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Explore industry demand, skill match percentages, and growth trajectories mapped to your profile.
          </p>
        </div>

        <div className="px-4 py-2 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-xl flex items-center gap-2 text-xs font-bold text-brand-700 dark:text-brand-300">
          <Target className="w-4 h-4 text-brand-600" />
          <span>Active Target: {user.targetRole}</span>
        </div>
      </div>

      {/* Career Roles Grid */}
      <div className="space-y-6">
        {careerRoles.map((role) => {
          const isCurrentTarget = user.targetRole === role.title;

          return (
            <Card key={role.id} hoverEffect className={`space-y-6 ${isCurrentTarget ? 'ring-2 ring-brand-500 border-brand-300' : ''}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="brand" className="text-[10px]">
                      {role.matchScore}% Profile Match
                    </Badge>
                    <Badge variant={role.industryDemand === 'Very High' ? 'success' : 'info'} className="text-[10px]">
                      {role.industryDemand} Demand
                    </Badge>
                    {isCurrentTarget && (
                      <Badge variant="warning" className="text-[10px]">
                        ★ Selected Goal
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {role.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                    {role.description}
                  </p>
                </div>

                <div className="flex flex-row md:flex-col items-end gap-3 md:gap-1 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0 w-full md:w-auto">
                  <div className="flex items-center gap-1 text-sm font-bold text-slate-900 dark:text-white">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>{role.salaryRange}</span>
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {role.growthRate}
                  </span>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Required Skills */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Required Core Competencies:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.requiredSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-2">
                  <p className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Your Current Missing Skills:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.missingSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800/60 rounded-lg text-xs font-semibold text-rose-700 dark:text-rose-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Responsibilities */}
              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <p className="font-bold text-slate-800 dark:text-slate-200">Day-in-the-Life Responsibilities:</p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {role.keyResponsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div className="flex justify-end gap-3 pt-2">
                {!isCurrentTarget ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSetTargetRole(role.title)}
                  >
                    Set as My Target Goal
                  </Button>
                ) : (
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => setActivePage('skill-gap')}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    View Skill Gap Matrix →
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
