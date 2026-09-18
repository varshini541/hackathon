import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Volume2, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Award,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';

export const QuizPage: React.FC = () => {
  const { quizQuestions, updateQuizScore, setActivePage } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentQ = quizQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctAnswer) {
      setScoreCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      const finalScorePercent = Math.round(((scoreCount + (selectedOption === currentQ.correctAnswer ? 1 : 0)) / quizQuestions.length) * 100);
      updateQuizScore(finalScorePercent);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScoreCount(0);
    setIsQuizCompleted(false);
  };

  const handleSpeechSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-To-Speech reader is active! (Simulated for this browser)");
    }
  };

  if (isQuizCompleted) {
    const finalPercent = Math.round((scoreCount / quizQuestions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto py-8 space-y-6">
        <Card className="text-center p-8 space-y-6">
          <div className="mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <Badge variant="brand" className="mb-2">Quiz Completed</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Diagnostic Assessment Score
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Your results have updated your personalized EduBridge skill matrix.
            </p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="text-5xl font-extrabold text-brand-600 dark:text-brand-400">
              {finalPercent}%
            </div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">
              You answered {scoreCount} out of {quizQuestions.length} questions correctly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button variant="outline" onClick={handleResetQuiz} icon={<RotateCcw className="w-4 h-4" />}>
              Retake Quiz
            </Button>
            <Button variant="primary" onClick={() => setActivePage('skill-gap')} icon={<ArrowRight className="w-4 h-4" />}>
              View Updated Skill Gap Analysis →
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Adaptive Diagnostic Quiz
            </h2>
            <Badge variant="neutral" className="text-[10px]">Dev 2 Module</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Question {currentIndex + 1} of {quizQuestions.length} • Subject: <strong>{currentQ.subject}</strong>
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleSpeechSpeak(`${currentQ.question}. Options: ${currentQ.options.join(', ')}`)}
          icon={<Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-brand-600 animate-pulse' : ''}`} />}
        >
          {isSpeaking ? 'Reading Aloud...' : 'Read Aloud (TTS)'}
        </Button>
      </div>

      <ProgressBar
        value={((currentIndex + 1) / quizQuestions.length) * 100}
        size="sm"
        color="brand"
        showPercentage={false}
      />

      {/* Question Card */}
      <Card className="space-y-6">
        <div className="flex justify-between items-start gap-4">
          <Badge variant={currentQ.difficulty === 'Easy' ? 'success' : currentQ.difficulty === 'Medium' ? 'warning' : 'danger'}>
            {currentQ.difficulty} Difficulty
          </Badge>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Untimed / Accessible</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {currentQ.question}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswer;
            
            let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-brand-400 text-slate-800 dark:text-slate-200';
            if (isAnswerSubmitted) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-100 font-bold';
              } else if (isSelected) {
                btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/80 text-rose-900 dark:text-rose-100';
              }
            } else if (isSelected) {
              btnStyle = 'border-brand-600 bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 font-bold ring-2 ring-brand-500/20';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between text-sm transition-all cursor-pointer ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Answer Explanation Modal Box */}
        {isAnswerSubmitted && (
          <div className="p-4 bg-brand-50/80 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-xl text-sm space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-bold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Pedagogical Explanation:</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-2">
          {!isAnswerSubmitted ? (
            <Button
              variant="primary"
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="ml-auto"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNextQuestion}
              icon={<ArrowRight className="w-4 h-4" />}
              className="ml-auto"
            >
              {currentIndex < quizQuestions.length - 1 ? 'Next Question →' : 'Complete Quiz & View Results'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
