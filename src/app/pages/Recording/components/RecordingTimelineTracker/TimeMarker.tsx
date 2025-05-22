import { formatDuration } from '@/app/shared/utils';
import { cn } from '@/lib/utils';

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
