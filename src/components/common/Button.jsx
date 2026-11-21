import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] transition-transform duration-75';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs min-h-[36px]',
    md: 'px-4 py-2.5 text-sm min-h-[44px]',
    lg: 'px-6 py-3.5 text-base min-h-[52px]'
  };

  const variantClasses = {
    emergency: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600 shadow-md',
    warning: 'bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 focus-visible:ring-orange-600 shadow-sm',
    primary: 'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 focus-visible:ring-slate-900 shadow-sm',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 focus-visible:ring-slate-400 border border-slate-300',
    outline: 'bg-transparent text-slate-800 border-2 border-slate-300 hover:bg-slate-100 focus-visible:ring-slate-500',
    emergencyOutline: 'bg-transparent text-red-700 border-2 border-red-600 hover:bg-red-50 focus-visible:ring-red-600',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-200 active:bg-slate-300'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseClasses} 
        ${sizeClasses[size] || sizeClasses.md} 
        ${variantClasses[variant] || variantClasses.primary} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'lg' ? 20 : 18} className="mr-2 flex-shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'lg' ? 20 : 18} className="ml-2 flex-shrink-0" />}
    </button>
  );
};
