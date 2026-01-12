
import React from 'react';

interface ModuleHeaderProps {
  title: string;
  description: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
      <p className="text-slate-400 text-lg max-w-3xl">{description}</p>
    </div>
  );
};

export default ModuleHeader;
