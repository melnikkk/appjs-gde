import React from 'react';
import { cn } from '@/lib/utils';
import { formatDuration } from '@/app/shared/utils';

interface VideoTimestampIndicatorProps {
  position: number;
  isVisible: boolean;
  currentTime: number;
}

export const VideoTimestampIndicator: React.FC<VideoTimestampIndicatorProps> = ({
  position,
  isVisible,
  currentTime,
}) => {
  if (!isVisible) {
    return null;
  }

  const formattedTime = formatDuration(currentTime);

  return (
    <div
      className={cn(
        'absolute z-10 -translate-y-1/4 transform',
        'animate-in fade-in zoom-in-95 duration-300 ease-in-out',
      )}
      style={{ left: `${position}%` }}
      aria-label="Current video position"
    >
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-gray-500">
        {formattedTime}
      </div>
      <div className="h-4 w-1 rounded-full bg-gray-500">
        <div />
      </div>
    </div>
  );
};
