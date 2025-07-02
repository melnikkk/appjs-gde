# Error Handling System

This documentation covers the error handling system implemented in the AppJS-GDE project.

## Overview

The error handling system consists of several components:

1. **UI Components**: Reusable error message displays and error boundaries
2. **Custom Hooks**: For managing error states and handling API errors
3. **Integration with RTK Query**: Specific error handling for API calls

## Components

### ErrorMessage

A customizable UI component to display errors to the user with optional retry functionality.

**Props**:

- `title`: Optional error title
- `message`: Optional error message details
- `onRetry`: Optional callback for retry button
- `className`: Additional styling classes

### ErrorBoundary

A React error boundary component that catches JavaScript errors anywhere in its child component tree and displays a fallback UI.

**Props**:

- `children`: Child components to render
- `fallback`: Optional custom fallback UI to display when an error occurs

## Custom Hooks

### useErrorHandler

A general-purpose hook for handling errors throughout the application.

**Features**:

- Error state management
- Error handling callbacks
- Error clearing functionality

### useRtkQueryErrorHandler

A specialized hook for handling errors from RTK Query API calls.

**Features**:

- Handles both `FetchBaseQueryError` and `SerializedError` types from RTK Query
- Extracts meaningful error messages from various API error formats
- Provides consistent error handling across API calls

## Usage

### Basic Error Display

```tsx
import { ErrorMessage } from '@/components/ui/error';

<ErrorMessage
  title="Something went wrong"
  message="Failed to load data"
  onRetry={handleRetry}
/>;
```

### Error Boundary Usage

```tsx
import { ErrorBoundary } from '@/components/ui/error';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>;
```

### API Error Handling

```tsx
import { useRtkQueryErrorHandler } from '@/hooks/error';

const Component = () => {
  const { isError, error, handleRtkQueryError, clearError } = useRtkQueryErrorHandler();

  const { data, error: apiError } = useSomeApiQuery();

  useEffect(() => {
    if (apiError) {
      handleRtkQueryError(apiError);
    }
  }, [apiError, handleRtkQueryError]);

  if (isError) {
    return <ErrorMessage message={error.message} onRetry={clearError} />;
  }

  return <YourComponent data={data} />;
};
```

## Best Practices

1. **Wrap Complex Components**: Use ErrorBoundary around complex components that might fail
2. **Meaningful Messages**: Provide clear error messages that help users understand what went wrong
3. **Recovery Options**: When possible, provide retry functionality
4. **Logging**: Consider adding error logging functionality for production environments
5. **Consistency**: Use the error components consistently throughout the application
