import { AlertCircle } from 'lucide-react';
import { Button } from '../button';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading the content. Please try again later.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-6 text-center',
        className,
      )}
    >
      <AlertCircle className="h-10 w-10 text-red-500" />
      <div>
        <h3 className="text-lg font-medium text-red-800">{title}</h3>
        <p className="mt-1 text-sm text-red-600">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-2">
          Try Again
        </Button>
      )}
    </div>
  );
};
