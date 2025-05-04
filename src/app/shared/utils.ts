export const millesecondsToSeconds = (msValue: number) =>
  Number(Math.floor(msValue / 1000).toFixed(2));

export function formatDuration(milliseconds: number): string {
  debugger;
  if (!milliseconds && milliseconds !== 0) {
    return '';
  }

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
