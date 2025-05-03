import { Badge } from '@/components/ui/badge';
import { DefaultRecordingPlaceholder } from './DefaultRecordingPlaceholder';
import { DeleteRecordingButton } from './DeleteRecordingButton';

interface Props {
  id: string;
  duration: string;
  imageUrl?: string;
}

export const RecordingPreview: React.FC<Props> = ({ id, imageUrl, duration }) => {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Recording thumbnail"
          className="h-full w-full object-cover"
        />
      ) : (
        <DefaultRecordingPlaceholder />
      )}

      <DeleteRecordingButton id={id} />

      <Badge
        variant="secondary"
        className="absolute right-3 bottom-3 bg-black/70 text-white"
      >
        {duration}
      </Badge>
    </div>
  );
};
