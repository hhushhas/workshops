import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'intro-to-ai',
    title: 'Intro to Working with AI',
    description: 'A comprehensive guide to using AI coding assistants effectively in your daily workflow.',
    path: '/slides/example.md',
    lastModified: '2025-12-14',
    slideCount: 12,
    tags: ['AI', 'Workflow', 'Productivity'],
    thumbnailGradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
  },
  {
    id: 'react-adv',
    title: 'Advanced React Patterns',
    description: 'Deep dive into compound components, render props, and custom hooks for scalable UI.',
    path: '/slides/react-patterns.md',
    lastModified: '2025-12-10',
    slideCount: 24,
    tags: ['React', 'Architecture', 'Frontend'],
    thumbnailGradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
  },
  {
    id: 'sys-design',
    title: 'System Design Fundamentals',
    description: 'Core concepts for building scalable distributed systems: Load balancing, Caching, and Partitioning.',
    path: '/slides/system-design.md',
    lastModified: '2025-11-28',
    slideCount: 18,
    tags: ['Backend', 'Scalability', 'Infrastructure'],
    thumbnailGradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
  }
];
