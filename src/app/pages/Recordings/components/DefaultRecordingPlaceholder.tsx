export const DefaultRecordingPlaceholder = () => {
  return (
    <div className="bg-accent/30 flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-background/80 flex h-12 w-12 items-center justify-center rounded-full shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground h-6 w-6"
          >
            <path d="M23 7 L16 12 23 17 23 7Z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="border-muted/50 h-32 w-32 rounded-full border-2 border-dashed" />
      </div>
    </div>
  );
};
