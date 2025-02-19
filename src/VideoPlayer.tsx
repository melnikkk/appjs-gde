import { FC, useRef, useEffect } from 'react';

interface Props {
  videoUrl?: string;
  width: number;
  height: number;
  pauseTime: number;
}

export const VideoPlayer: FC<Props> = ({ videoUrl, width, height, pauseTime }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && isFinite(pauseTime) && pauseTime >= 0) {
      videoRef.current.currentTime = pauseTime;
    }
  }, [pauseTime]);

  return (
    <video width={width} height={height} src={videoUrl} ref={videoRef}>
      Your browser does not support the video tag.
    </video>
  );
};
