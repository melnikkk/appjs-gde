import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useErrorHandler } from './useErrorHandler';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function isSerializedError(error: unknown): error is SerializedError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    'message' in error &&
    'code' in error
  );
}

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined,
): string {
  if (!error) {
    return 'An unknown error occurred';
  }

  if (isFetchBaseQueryError(error)) {
    const status = error.status;

    if (status === 'FETCH_ERROR') {
      return 'Failed to connect to the server. Please check your internet connection.';
    }

    if (status === 'PARSING_ERROR') {
      return 'Received invalid data from server.';
    }

    if (status === 'TIMEOUT_ERROR') {
      return 'Request timed out. Please try again later.';
    }

    if (typeof status === 'number') {
      if (status === 401) {
        return 'Authentication required. Please log in again.';
      }
      if (status === 403) {
        return 'You do not have permission to access this resource.';
      }
      if (status === 404) {
        return 'The requested resource was not found.';
      }
      if (status === 429) {
        return 'Too many requests. Please try again later.';
      }
      if (status >= 500) {
        return 'Server error. Please try again later.';
      }
    }

    if ('data' in error && error.data) {
      const data = error.data as unknown;

      if (typeof data === 'object' && data !== null && 'message' in data) {
        return String(data.message);
      }

      if (typeof data === 'object' && data !== null && 'error' in data) {
        return String(data.error);
      }

      if (typeof data === 'string') {
        return data;
      }
    }
  } else if (isSerializedError(error)) {
    return error.message || 'An unknown error occurred';
  }

  return 'An unknown error occurred';
}

export function useRtkQueryErrorHandler() {
  const { handleError, ...rest } = useErrorHandler();

  const handleRtkQueryError = (
    error: FetchBaseQueryError | SerializedError | undefined,
  ) => {
    if (!error) {
      return;
    }

    const errorMessage = getErrorMessage(error);

    handleError(new Error(errorMessage));
  };

  return {
    ...rest,
    handleRtkQueryError,
  };
}
