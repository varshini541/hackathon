import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';

import { AuthPage } from './features/auth/AuthPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { SettingsPage } from './features/settings/SettingsPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { QuizPage } from './features/quiz/QuizPage';
import { SkillGapPage } from './features/skill-gap/SkillGapPage';
import { LearningPage } from './features/learning/LearningPage';
import { CareerPage } from './features/career/CareerPage';
import { ChatbotPage } from './features/chatbot/ChatbotPage';
import { MentorshipPage } from './features/mentorship/MentorshipPage';

const PageRenderer: React.FC = () => {
  const { activePage } = useApp();

  switch (activePage) {
    case 'login':
      return <AuthPage />;
    case 'onboarding':
      return <ProfilePage />;
    case 'settings':
      return <SettingsPage />;
    case 'dashboard':
      return <DashboardPage />;
    case 'quiz':
      return <QuizPage />;
    case 'skill-gap':
      return <SkillGapPage />;
    case 'learning':
      return <LearningPage />;
    case 'career':
      return <CareerPage />;
    case 'chatbot':
      return <ChatbotPage />;
    case 'mentorship':
      return <MentorshipPage />;
    default:
      return <DashboardPage />;
  }
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Layout>
        <PageRenderer />
      </Layout>
    </AppProvider>
  );
};

export default App;
