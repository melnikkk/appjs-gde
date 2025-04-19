import { FC, useRef, useEffect } from 'react';
import { millesecondsToSeconds } from '../../shared/utils';

interface Props {
  width: number;
  height: number;
  pauseTime: number;
  source: string;
}

export const VideoPlayer: FC<Props> = ({ source, width, height, pauseTime }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && isFinite(pauseTime) && pauseTime >= 0) {
      videoRef.current.currentTime = millesecondsToSeconds(pauseTime);
    }
  }, [pauseTime]);

  return (
    <video width={width} height={height} ref={videoRef}>
      {source && <source src={source} />}
      Your browser does not support the video tag.
    </video>
  );
};
