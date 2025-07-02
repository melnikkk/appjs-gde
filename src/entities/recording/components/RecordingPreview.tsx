import { Badge } from '@/shared/ui-kit/badge';
import { DefaultRecordingPlaceholder } from './DefaultRecordingPlaceholder';

interface Props {
  id: string;
  duration: string;
  imageUrl: string | null;
  DeleteButtonPort: React.ComponentType<{ id: string }>;
}

export const RecordingPreview: React.FC<Props> = ({ 
  id, 
  imageUrl, 
  duration,
  DeleteButtonPort 
}) => {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Recording thumbnail"
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <DefaultRecordingPlaceholder />
      )}

      <DeleteButtonPort id={id} />

      <Badge
        variant="secondary"
        className="absolute right-3 bottom-3 bg-black/70 text-white"
      >
        {duration}
      </Badge>
    </div>
  );
};
