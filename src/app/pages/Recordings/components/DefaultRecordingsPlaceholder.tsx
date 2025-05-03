import { Film } from 'lucide-react';

export const DefaultRecordingsPlaceholder = () => {
  return (
    <div className="flex h-[calc(100vh-250px)] w-full flex-col items-center justify-center text-center">
      <div className="bg-accent/30 flex h-20 w-20 items-center justify-center rounded-full">
        <Film className="text-muted-foreground h-10 w-10" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">No recordings found</h3>
      <p className="text-muted-foreground mt-2 max-w-md">
        When you create recordings, they will appear here.
      </p>
    </div>
  );
};
