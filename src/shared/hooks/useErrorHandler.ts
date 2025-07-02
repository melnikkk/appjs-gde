import { useState, useCallback } from 'react';

interface ErrorHandlerOptions {
  onError?: (error: Error) => void;
}

export function useErrorHandler(options?: ErrorHandlerOptions) {
  const [error, setError] = useState<Error | null>(null);
  const [isError, setIsError] = useState(false);

  const handleError = useCallback(
    (error: Error) => {
      setError(error);
      setIsError(true);

      if (options?.onError) {
        options.onError(error);
      }

      if (process.env.NODE_ENV === 'development') {
        console.error('Error caught by useErrorHandler:', error);
      }
    },
    [options],
  );

  const clearError = useCallback(() => {
    setError(null);
    setIsError(false);
  }, []);

  return {
    error,
    isError,
    handleError,
    clearError,
  };
}
