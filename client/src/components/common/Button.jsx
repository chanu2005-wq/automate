import { Loader2 } from 'lucide-react';

const Button = ({ variant = 'primary', size = 'md', loading, disabled, children, className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' };
  const variants = {
    primary: 'bg-charcoal-900 text-white hover:bg-charcoal-800 shadow-sm',
    accent: 'bg-accent-600 text-white hover:bg-accent-700 shadow-amber',
    outline: 'border-2 border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-white',
    ghost: 'text-charcoal-700 hover:bg-charcoal-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
