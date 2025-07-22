import React, { FC, RefObject, useEffect } from 'react';
import { useGetAuthenticatedMediaQuery } from '@/shared/api';
import { millesecondsToSeconds } from '@/shared/lib/time-utils';
import { cn } from '@/shared/lib/styles-utils';

interface Props {
  width: number;
  height: number;
  pauseTime: number;
  videoPath: string;
  className?: string;
  videoRef: RefObject<HTMLVideoElement>;
  onTimeUpdate?: (time: number) => void;
  handleMediaLoad: () => void;
}

export const AuthenticatedVideo: FC<Props> = ({
  videoPath,
  videoRef,
  pauseTime,
  onTimeUpdate,
  handleMediaLoad,
  width,
  height,
  className,
  ...props
}) => {
  const {
    data: objectUrl,
    isLoading,
    isError,
  } = useGetAuthenticatedMediaQuery({ mediaPath: videoPath || '' }, { skip: !videoPath });

  useEffect(() => {
    if (videoRef?.current && pauseTime) {
      const seconds = millesecondsToSeconds(pauseTime);
      videoRef.current.currentTime = seconds;
    }
  }, [pauseTime, videoRef]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (onTimeUpdate && e.currentTarget) {
      onTimeUpdate(e.currentTarget.currentTime * 1000);
    }
  };

  if (isLoading) {
    return (
      <div
        className="h-full w-full animate-pulse bg-gray-200"
        style={{ width, height }}
      />
    );
  }

  if (isError || !objectUrl) {
    return null;
  }

  const defaultStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '70vh',
  };

  return (
    <div className={cn('relative', className)}>
      <video
        ref={videoRef}
        src={objectUrl}
        style={defaultStyle}
        onLoadedData={handleMediaLoad}
        onTimeUpdate={handleTimeUpdate}
        {...props}
      />
    </div>
  );
};
