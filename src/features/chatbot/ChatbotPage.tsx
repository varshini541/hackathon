import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Volume2, 
  User, 
  RefreshCw, 
  Lightbulb, 
  BookOpen, 
  Code,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const ChatbotPage: React.FC = () => {
  const { chatMessages, addChatMessage, user } = useApp();
  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptPresets = [
    { label: '💡 Explain simply', text: 'Explain binary search trees simply with a visual metaphor.' },
    { label: '🐍 Practice Code', text: 'Show me a Python PyTorch example for a basic linear regression model.' },
    { label: '♿ Dyslexia Notes', text: 'Give me 3 bite-sized bullet points summarizing web accessibility rules.' },
    { label: '🎯 Career Tip', text: `What skills should I prioritize to become a ${user.targetRole}?` }
  ];

 const handleSend = (e?: React.FormEvent) => {
  if (e) e.preventDefault();

  const message = inputQuery.trim();
  if (!message) return;

  const personalizedPrompt = `
You are EduBridge AI Tutor.

Student name: ${user.name}
Career goal: ${user.targetRole}
Education level: ${user.educationLevel}
Learning style: ${user.learningStyles.join(', ')}
Accessibility needs: ${user.accommodations.join(', ')}

Student question:
${message}

Give a simple, personalized answer.
Use short steps and examples.
If the question is related to the student's career goal, connect the answer to that goal.
  `.trim();

  addChatMessage(personalizedPrompt, 'user');
  setInputQuery('');
};

  const handlePresetClick = (presetText: string) => {
    addChatMessage(presetText, 'user');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-600 rounded-xl text-white shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">
                EduBridge AI Tutor
              </h2>
              <Badge variant="brand" className="text-[10px]">Neurodivergent Friendly</Badge>
              <Badge variant="neutral" className="text-[10px]">Dev 4 Module</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized AI assistant tailored to your learning style and target role: <strong>{user.targetRole}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 shrink-0">Quick Prompts:</span>
        {promptPresets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handlePresetClick(p.text)}
            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-brand-400 hover:text-brand-600 transition-colors shrink-0 cursor-pointer shadow-2xs"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chat Conversation Thread */}
      <Card className="min-h-[420px] max-h-[520px] flex flex-col p-4 overflow-hidden">
        <div className="grow overflow-y-auto space-y-4 pr-2">
          {chatMessages.map((msg) => {
            const isAI = msg.sender === 'ai';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
              >
                {/* Avatar */}
                {isAI ? (
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                ) : (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-brand-500/20"
                  />
                )}

                {/* Message Bubble */}
                <div className={`max-w-[80%] rounded-2xl p-4 space-y-2 text-sm leading-relaxed ${
                  isAI
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700'
                    : 'bg-brand-600 text-white shadow-sm'
                }`}>
                  <div className="flex justify-between items-center gap-4 text-[10px] opacity-75 font-semibold">
                    <span>{isAI ? 'EduBridge AI' : user.name}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  {msg.suggestedAction && (
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => addChatMessage(msg.suggestedAction!, 'user')}
                        className="text-xs font-bold text-brand-600 dark:text-brand-300 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Follow-up: {msg.suggestedAction}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
          <input
            type="text"
            placeholder="Ask anything (e.g. 'Explain recursion simply')..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            className="grow px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <Button type="submit" variant="primary" icon={<Send className="w-4 h-4" />}>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};
