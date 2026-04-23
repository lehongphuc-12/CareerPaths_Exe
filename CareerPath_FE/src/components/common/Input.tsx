import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-medium text-slate-700 ml-1">{label}</label>}
      <input
        className={`w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50/50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 ${
          error ? 'border-red-300 focus:border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};
