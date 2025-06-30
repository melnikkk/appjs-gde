import { Skeleton } from '@/components/ui/skeleton';

export const RecordingTimelineEventSkeleton: React.FC = () => {
  return (
    <div className="mb-2 rounded-lg border">
      <div className="flex w-full items-center px-3 py-3">
        <div className="relative mr-4">
          <Skeleton className={`h-8 w-8 rounded-full bg-gray-400/70`} />
        </div>

        <div className="flex-1 text-left">
          <Skeleton className={`mb-2 h-5 w-1/3 bg-gray-400/70`} />
          <Skeleton className={`h-6 bg-gray-400/70`} />
        </div>
      </div>
    </div>
  );
};
