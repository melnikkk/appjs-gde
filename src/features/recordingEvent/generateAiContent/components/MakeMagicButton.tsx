import { SparklesIcon } from 'lucide-react';
import { Button } from '@/shared/ui-kit/button';
import { TooltipContent, Tooltip, TooltipTrigger } from '@/shared/ui-kit/tooltip';

interface Props {
  onClick?: () => void;
}

export const MakeMagicButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="outline" className="h-9 w-9 p-0" onClick={onClick}>
          <SparklesIcon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Make magic!</p>
      </TooltipContent>
    </Tooltip>
  );
};
