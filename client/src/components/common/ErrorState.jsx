import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

const ErrorState = ({ message, onRetry, className = '' }) => {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Something went wrong</h3>
      <p className="mt-1 text-sm text-gray-500">{message || 'An unexpected error occurred.'}</p>
      {onRetry && (
        <div className="mt-6">
          <Button variant="outline" onClick={onRetry}>Try Again</Button>
        </div>
      )}
    </div>
  );
};

export default ErrorState;
