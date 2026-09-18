export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'educator' | 'mentor';
  avatar: string;
  targetRole: string;
  educationLevel: string;
  institution: string;
  learningStyles: string[];
  accommodations: string[];
  skillReadinessScore: number;
  streakDays: number;
  completedModules: number;
  totalStudyHours: number;
  bio: string;
}

export interface QuizQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface SkillGapItem {
  id: string;
  skillName: string;
  category: string;
  currentLevel: number; // 0 - 100
  targetLevel: number;  // 0 - 100
  gapSeverity: 'Low' | 'Medium' | 'High';
  recommendedCourses: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number; // 0 - 100
  status: 'completed' | 'in-progress' | 'recommended' | 'locked';
  estimatedTime: string;
  aiSummary: string;
  lessons: { id: string; title: string; duration: string; completed: boolean }[];
}

export interface CareerRole {
  id: string;
  title: string;
  matchScore: number;
  salaryRange: string;
  growthRate: string;
  description: string;
  requiredSkills: string[];
  missingSkills: string[];
  keyResponsibilities: string[];
  industryDemand: 'Very High' | 'High' | 'Moderate';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  expertise: string[];
  bio: string;
  availableSlots: string[];
  isVerified: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

export const MOCK_USER: UserProfile = {
  id: 'usr-101',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  targetRole: 'Full Stack AI Engineer',
  educationLevel: 'Undergraduate (2nd Year)',
  institution: 'Metropolitan Tech University',
  learningStyles: ['Visual Learner', 'Hands-on Coding', 'Bite-Sized Lessons'],
  accommodations: ['Dyslexic-friendly Font', 'Audio Explanation Support'],
  skillReadinessScore: 78,
  streakDays: 14,
  completedModules: 18,
  totalStudyHours: 42,
  bio: 'Passionate about building accessible web apps and artificial intelligence applications for social impact.'
};

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    subject: 'Data Structures',
    question: 'What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'In a balanced BST, each comparison eliminates half of the remaining nodes, giving a logarithmic time complexity of O(log n).',
    difficulty: 'Medium'
  },
  {
    id: 'q2',
    subject: 'AI & Machine Learning',
    question: 'Which neural network architecture is primarily suited for natural language processing and sequential data?',
    options: ['Convolutional Neural Networks (CNN)', 'Recurrent Neural Networks (RNN / Transformer)', 'Generative Adversarial Networks (GAN)', 'Perceptron'],
    correctAnswer: 1,
    explanation: 'RNNs and Transformer architectures are designed to maintain contextual sequential memory, making them ideal for NLP.',
    difficulty: 'Medium'
  },
  {
    id: 'q3',
    subject: 'Web Development',
    question: 'In React, what hook is used to perform side effects such as data fetching or DOM subscriptions?',
    options: ['useState', 'useContext', 'useEffect', 'useReducer'],
    correctAnswer: 2,
    explanation: 'useEffect accepts a function that runs after the component renders, handling asynchronous tasks and subscriptions.',
    difficulty: 'Easy'
  },
  {
    id: 'q4',
    subject: 'Algorithms',
    question: 'Which sorting algorithm guarantees O(n log n) time complexity even in the worst-case scenario?',
    options: ['QuickSort', 'BubbleSort', 'MergeSort', 'InsertionSort'],
    correctAnswer: 2,
    explanation: 'MergeSort recursively divides the array into halves and merges them, maintaining O(n log n) time complexity in all cases.',
    difficulty: 'Hard'
  },
  {
    id: 'q5',
    subject: 'Accessibility (a11y)',
    question: 'Which ARIA attribute provides a screen reader accessible label when visible text is absent?',
    options: ['aria-hidden', 'aria-label', 'aria-live', 'aria-describedby'],
    correctAnswer: 1,
    explanation: 'aria-label defines a string that labels the interactive element for assistive technologies when visible text isn\'t enough.',
    difficulty: 'Easy'
  }
];

export const MOCK_SKILL_GAPS: SkillGapItem[] = [
  {
    id: 'sg-1',
    skillName: 'TypeScript & Type Safety',
    category: 'Frontend Engineering',
    currentLevel: 85,
    targetLevel: 90,
    gapSeverity: 'Low',
    recommendedCourses: ['Advanced TypeScript Patterns', 'Clean Architecture in TS']
  },
  {
    id: 'sg-2',
    skillName: 'PyTorch & Neural Networks',
    category: 'Artificial Intelligence',
    currentLevel: 45,
    targetLevel: 85,
    gapSeverity: 'High',
    recommendedCourses: ['Deep Learning Fundamentals with PyTorch', 'Building LLM Agents']
  },
  {
    id: 'sg-3',
    skillName: 'REST API & GraphQL Security',
    category: 'Backend Architecture',
    currentLevel: 60,
    targetLevel: 80,
    gapSeverity: 'Medium',
    recommendedCourses: ['Secure API Design with Node.js', 'GraphQL Microservices']
  },
  {
    id: 'sg-4',
    skillName: 'Docker & Containerization',
    category: 'DevOps & Cloud',
    currentLevel: 30,
    targetLevel: 75,
    gapSeverity: 'High',
    recommendedCourses: ['Docker & Kubernetes for Developers', 'CI/CD Pipelines']
  },
  {
    id: 'sg-5',
    skillName: 'Web Accessibility (WCAG 2.1)',
    category: 'Inclusive UX',
    currentLevel: 90,
    targetLevel: 95,
    gapSeverity: 'Low',
    recommendedCourses: ['Accessible Web Design Masterclass']
  }
];

export const MOCK_LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod-1',
    title: 'Fundamentals of Inclusive AI Systems',
    category: 'AI & Ethics',
    description: 'Learn how to detect bias in datasets, implement algorithmic fairness, and ensure AI applications are accessible to all user demographics.',
    duration: '2h 15m',
    level: 'Beginner',
    progress: 100,
    status: 'completed',
    estimatedTime: '3 Lessons',
    aiSummary: 'Covers core ethical principles, dataset auditing tools, and WCAG accessibility standards in modern software.',
    lessons: [
      { id: 'les-1', title: 'Introduction to Ethical AI', duration: '20m', completed: true },
      { id: 'les-2', title: 'Detecting Algorithmic Bias', duration: '45m', completed: true },
      { id: 'les-3', title: 'Building Screen-Reader Ready Interfaces', duration: '1h 10m', completed: true },
    ]
  },
  {
    id: 'mod-2',
    title: 'Deep Learning & Neural Architectures',
    category: 'Artificial Intelligence',
    description: 'Master tensor operations, backpropagation, convolutional layers, and self-attention mechanisms in PyTorch.',
    duration: '4h 45m',
    level: 'Intermediate',
    progress: 45,
    status: 'in-progress',
    estimatedTime: '5 Lessons',
    aiSummary: 'Hands-on practice constructing neural networks from scratch and training models on image and text data.',
    lessons: [
      { id: 'les-4', title: 'Tensors and Matrix Multiplication', duration: '35m', completed: true },
      { id: 'les-5', title: 'Building your First Perceptron', duration: '50m', completed: true },
      { id: 'les-6', title: 'Loss Functions and Gradient Descent', duration: '1h 00m', completed: false },
      { id: 'les-7', title: 'Introduction to Transformers & Attention', duration: '1h 20m', completed: false },
    ]
  },
  {
    id: 'mod-3',
    title: 'Cloud Deployment & Containerization with Docker',
    category: 'DevOps',
    description: 'Package web applications into lightweight containers and deploy them seamlessly across cloud environments.',
    duration: '3h 30m',
    level: 'Intermediate',
    progress: 10,
    status: 'recommended',
    estimatedTime: '4 Lessons',
    aiSummary: 'Teaches Dockerfile optimization, multi-container orchestration with Docker Compose, and environment security.',
    lessons: [
      { id: 'les-8', title: 'Docker Basics & Containers vs VMs', duration: '40m', completed: true },
      { id: 'les-9', title: 'Writing Production Dockerfiles', duration: '50m', completed: false },
      { id: 'les-10', title: 'Docker Compose for Full Stack Apps', duration: '1h 00m', completed: false },
    ]
  },
  {
    id: 'mod-4',
    title: 'Full Stack Web Architecture with React & Node',
    category: 'Web Development',
    description: 'Design scaleable web apps with state management, custom hooks, RESTful endpoints, and PostgreSQL storage.',
    duration: '6h 00m',
    level: 'Advanced',
    progress: 0,
    status: 'locked',
    estimatedTime: '6 Lessons',
    aiSummary: 'End-to-end full stack development with clean architectural layers and automated testing integration.',
    lessons: [
      { id: 'les-11', title: 'System Architecture & Data Modeling', duration: '1h 00m', completed: false },
      { id: 'les-12', title: 'Building Async REST APIs', duration: '1h 15m', completed: false },
    ]
  }
];

export const MOCK_CAREER_ROLES: CareerRole[] = [
  {
    id: 'car-1',
    title: 'Full Stack AI Engineer',
    matchScore: 92,
    salaryRange: '$115,000 - $165,000',
    growthRate: '+32% annual growth',
    description: 'Builds end-to-end web applications powered by generative AI models, microservices, and user-centric interfaces.',
    requiredSkills: ['React/Next.js', 'Python', 'TypeScript', 'PyTorch', 'REST & GraphQL', 'Docker'],
    missingSkills: ['PyTorch & Neural Networks', 'Docker & Containerization'],
    keyResponsibilities: [
      'Integrate LLMs and custom ML models into React applications',
      'Optimize API response latencies and token usage',
      'Design accessible, WCAG-compliant responsive user interfaces'
    ],
    industryDemand: 'Very High'
  },
  {
    id: 'car-2',
    title: 'Accessibility Software Specialist',
    matchScore: 88,
    salaryRange: '$105,000 - $145,000',
    growthRate: '+24% annual growth',
    description: 'Specializes in creating digital products that meet rigorous accessibility guidelines (WCAG) for users of all abilities.',
    requiredSkills: ['ARIA Specifications', 'Semantic HTML', 'Assistive Tech Testing', 'TypeScript', 'UX Design'],
    missingSkills: ['Screen Reader Automated Testing'],
    keyResponsibilities: [
      'Audit web platforms for WCAG 2.1 AA compliance',
      'Educate development teams on inclusive component patterns',
      'Build custom assistive tech tools and browser plugins'
    ],
    industryDemand: 'High'
  },
  {
    id: 'car-3',
    title: 'Applied AI Researcher',
    matchScore: 74,
    salaryRange: '$130,000 - $185,000',
    growthRate: '+28% annual growth',
    description: 'Researches and fine-tunes deep learning models for domain-specific tasks such as natural language understanding and computer vision.',
    requiredSkills: ['PyTorch/TensorFlow', 'Linear Algebra', 'Python', 'Model Quantization', 'GPU Optimization'],
    missingSkills: ['PyTorch & Neural Networks', 'Linear Algebra & Calculus', 'Model Quantization'],
    keyResponsibilities: [
      'Design and evaluate state-of-the-art model architectures',
      'Fine-tune open weights models on proprietary datasets',
      'Publish research findings and open-source benchmarks'
    ],
    industryDemand: 'Very High'
  }
];

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'men-1',
    name: 'Dr. Elena Rostova',
    role: 'Principal AI Scientist',
    company: 'Neural Dynamics Labs',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 38,
    expertise: ['AI Ethics', 'PyTorch', 'Career Transition', 'Research Guidance'],
    bio: '10+ years in machine learning research. Dedicated to helping underrepresented students break into AI research and engineering.',
    availableSlots: ['Tomorrow, 3:00 PM', 'Thursday, 10:00 AM', 'Friday, 4:30 PM'],
    isVerified: true
  },
  {
    id: 'men-2',
    name: 'Marcus Chen',
    role: 'Staff Accessibility Engineer',
    company: 'Inclusive Tech Corp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 52,
    expertise: ['Web Accessibility', 'React', 'Design Systems', 'Interview Prep'],
    bio: 'Passionate about assistive tech and inclusive software engineering. Guided 40+ mentees into top engineering roles.',
    availableSlots: ['Wednesday, 2:00 PM', 'Thursday, 5:00 PM', 'Saturday, 11:00 AM'],
    isVerified: true
  },
  {
    id: 'men-3',
    name: 'Priya Sharma',
    role: 'Senior Product Designer',
    company: 'EdTech Global',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 29,
    expertise: ['Student Centric Design', 'UI/UX', 'Portfolio Reviews'],
    bio: 'Creating accessible learning tools for neurodivergent learners. Love helping students craft standout project portfolios.',
    availableSlots: ['Thursday, 1:00 PM', 'Friday, 2:00 PM'],
    isVerified: true
  }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'ai',
    text: 'Hello Alex! I am EduBridge AI, your personalized learning assistant. How can I help you master your subjects today?',
    timestamp: '10:00 AM',
    suggestedAction: 'Explain binary search trees simply'
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'Can you give me a simple real-world analogy for how PyTorch neural networks learn?',
    timestamp: '10:01 AM'
  },
  {
    id: 'm3',
    sender: 'ai',
    text: 'Think of training a neural network like learning to shoot a basketball:\n\n1. **Forward Pass**: You take a shot (the network makes a prediction).\n2. **Loss Calculation**: You measure how far the ball missed the hoop (the error or loss).\n3. **Backpropagation**: Your brain adjusts your arm angle and force based on how far off you were.\n4. **Optimization**: You repeat this process hundreds of times until your shots hit the net consistently!',
    timestamp: '10:01 AM',
    suggestedAction: 'Show me Python code for a simple PyTorch model'
  }
];
