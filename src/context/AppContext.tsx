import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MOCK_USER, 
  MOCK_QUIZ_QUESTIONS, 
  MOCK_SKILL_GAPS, 
  MOCK_LEARNING_MODULES, 
  MOCK_CAREER_ROLES, 
  MOCK_MENTORS, 
  MOCK_CHAT_MESSAGES,
  UserProfile,
  QuizQuestion,
  SkillGapItem,
  LearningModule,
  CareerRole,
  Mentor,
  ChatMessage
} from '../data/mockData';

export type PageId = 
  | 'login' 
  | 'onboarding' 
  | 'dashboard' 
  | 'quiz' 
  | 'skill-gap' 
  | 'learning' 
  | 'career' 
  | 'chatbot' 
  | 'mentorship' 
  | 'settings';

interface AppContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  isDyslexicFont: boolean;
  toggleDyslexicFont: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  
  // Data stores
  quizQuestions: QuizQuestion[];
  skillGaps: SkillGapItem[];
  learningModules: LearningModule[];
  careerRoles: CareerRole[];
  mentors: Mentor[];
  chatMessages: ChatMessage[];
  
  // Actions
  addChatMessage: (text: string, sender?: 'user' | 'ai') => void;
  updateModuleProgress: (moduleId: string, progress: number) => void;
  bookMentorSlot: (mentorId: string, slot: string) => void;
  updateQuizScore: (score: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isDyslexicFont, setIsDyslexicFont] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const [quizQuestions] = useState<QuizQuestion[]>(MOCK_QUIZ_QUESTIONS);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(MOCK_SKILL_GAPS);
  const [learningModules, setLearningModules] = useState<LearningModule[]>(MOCK_LEARNING_MODULES);
  const [careerRoles] = useState<CareerRole[]>(MOCK_CAREER_ROLES);
  const [mentors] = useState<Mentor[]>(MOCK_MENTORS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);

  // Apply dark mode & high contrast classes to root html document
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const body = document.body;
    if (isHighContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  useEffect(() => {
    const body = document.body;
    if (isDyslexicFont) {
      body.classList.add('dyslexic-font');
    } else {
      body.classList.remove('dyslexic-font');
    }
  }, [isDyslexicFont]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleHighContrast = () => setIsHighContrast(prev => !prev);
  const toggleDyslexicFont = () => setIsDyslexicFont(prev => !prev);

  const addChatMessage = (text: string, sender: 'user' | 'ai' = 'user') => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages(prev => [...prev, newMessage]);

    // Simulate quick AI response if user sent a message
    if (sender === 'user') {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `msg-ai-${Date.now()}`,
          sender: 'ai',
          text: `Great question! Regarding "${text.slice(0, 30)}...", here is an inclusive, step-by-step breakdown tailored to your target role as ${user.targetRole}:\n\n- Key Concept: Break down complex logic into modular steps.\n- Practice Tip: Apply this directly in your current learning path modules.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: 'Take a quick 2-minute quiz on this topic'
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const updateModuleProgress = (moduleId: string, progress: number) => {
    setLearningModules(prev =>
      prev.map(mod => {
        if (mod.id === moduleId) {
          const newStatus = progress >= 100 ? 'completed' : 'in-progress';
          return { ...mod, progress, status: newStatus };
        }
        return mod;
      })
    );
  };

  const bookMentorSlot = (mentorId: string, slot: string) => {
    alert(`Success! Session booked with mentor for ${slot}. A calendar invitation has been sent to your email.`);
  };

  const updateQuizScore = (score: number) => {
    setUser(prev => ({
      ...prev,
      skillReadinessScore: Math.min(100, Math.round((prev.skillReadinessScore + score) / 2))
    }));
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        user,
        setUser,
        isDarkMode,
        toggleDarkMode,
        isHighContrast,
        toggleHighContrast,
        isDyslexicFont,
        toggleDyslexicFont,
        fontSize,
        setFontSize,
        quizQuestions,
        skillGaps,
        learningModules,
        careerRoles,
        mentors,
        chatMessages,
        addChatMessage,
        updateModuleProgress,
        bookMentorSlot,
        updateQuizScore
      }}
    >
      <div className={fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : 'text-base'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
