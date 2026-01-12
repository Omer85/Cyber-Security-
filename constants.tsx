
import React from 'react';

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  accent: '#f59e0b',
  danger: '#ef4444',
  bg: '#020617',
  card: '#1e293b',
  vitePurple: '#646cff',
  viteYellow: '#ffda44'
};

export const Icons = {
  Vite: ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 256 257" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
      <defs>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="a">
          <stop stopColor="#41D1FF" offset="0%"/>
          <stop stopColor="#BD34FE" offset="100%"/>
        </linearGradient>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="b">
          <stop stopColor="#FFEA83" offset="8.333%"/>
          <stop stopColor="#FFDD35" offset="100%"/>
        </linearGradient>
      </defs>
      <path d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.854 37.358c-2.53-4.43.744-9.867 5.834-9.712l243.312 7.425c5.092.155 7.64 5.756 5.153 10.867z" fill="url(#a)"/>
      <path d="M195.127 7.271L132.808 179.45c-2.418 4.674-9.144 4.64-11.514-.059L63.508 7.03c-2.399-4.757 1.03-10.212 6.355-10.154l118.885 1.257c5.356.056 8.745 5.536 6.379 10.138z" fill="url(#b)"/>
    </svg>
  ),
  // Add missing KKULogo icon used in components/Sidebar.tsx
  KKULogo: ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 200 60" className={className} xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e293b" fontFamily="system-ui">KKU</text>
    </svg>
  ),
  Shield: ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Alert: ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  ),
  Network: ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
  ),
  Brain: ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54z"/></svg>
  ),
  Code: ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
  Share: ({ className = "" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
  )
};
