import React, { FC } from 'react';
import { useGetAuthenticatedMediaQuery } from '@/shared/api';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  thumbnailPath: string | null;
  ref: React.RefObject<HTMLImageElement>;
  fallback?: React.ReactNode;
}

export const AuthenticatedImage: FC<Props> = ({
  thumbnailPath,
  fallback,
  ref,
  ...props
}) => {
  const {
    data: objectUrl,
    isLoading,
    isError,
  } = useGetAuthenticatedMediaQuery(
    { mediaPath: thumbnailPath || '' },
    { skip: !thumbnailPath },
  );

  if (isLoading) {
    return <div className="h-full w-full animate-pulse bg-gray-200" />;
  }

  if (isError || !objectUrl) {
    return fallback || null;
  }

  return <img ref={ref} src={objectUrl} {...props} />;
};
