import { Calendar, MousePointer } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui-kit/card';
import { formatDate, formatDuration } from '@/shared/lib/time-utils';
import { RecordingPreview } from './RecordingPreview';

interface Props {
  id: string;
  name: string;
  createdAt: string;
  duration: number;
  thumbnailUrl: string | null;
  eventsCount: number;
  DeleteButtonPort: React.ComponentType<{ id: string }>;
}

export const RecordingCard: React.FC<Props> = ({
  name,
  id,
  thumbnailUrl,
  duration,
  createdAt,
  eventsCount,
  DeleteButtonPort,
}) => {
  const formattedDuration = formatDuration(duration);
  const formattedCreatedAt = formatDate(createdAt);

  return (
    <Card className="group pt-0">
      <Link to="/recordings/$id" params={{ id }} className="block h-full">
        <CardHeader className="p-0">
          <RecordingPreview
            id={id}
            imageUrl={thumbnailUrl}
            duration={formattedDuration}
            DeleteButtonPort={DeleteButtonPort}
          />
        </CardHeader>
        <CardContent className="pt-4">
          <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </CardTitle>
          <div className="text-muted-foreground mt-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{formattedCreatedAt}</span>
            </div>
            {eventsCount !== undefined && (
              <div className="flex items-center gap-1">
                <MousePointer className="h-4 w-4" />
                <span>
                  <strong>{eventsCount}</strong> events
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
