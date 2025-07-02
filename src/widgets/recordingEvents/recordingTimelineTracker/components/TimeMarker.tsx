import { formatDuration } from '@/shared/lib/time-utils';
import { cn } from '@/shared/lib/styles-utils';

interface Props {
  duration: number;
  className?: string;
}

export const TimeMarker: React.FC<Props> = ({ duration, className }) => (
  <div
    className={cn(
      'text-muted-foreground absolute -top-6 text-xs whitespace-nowrap',
      className,
    )}
  >
    {formatDuration(duration)}
  </div>
);
