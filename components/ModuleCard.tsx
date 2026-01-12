
import React from 'react';

interface ModuleCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
      <div className="flex items-center gap-4 mb-4">
        {icon && <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-900/30 group-hover:text-blue-400 transition-all">{icon}</div>}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="text-slate-400 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default ModuleCard;
