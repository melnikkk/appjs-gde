import { FC, useRef, useEffect, useState } from 'react';
import { millesecondsToSeconds } from '../../shared/utils';

interface Props {
  width: number;
  height: number;
  pauseTime: number;
  source: string;
  ref?: React.RefObject<HTMLVideoElement>;
  onResize?: (dimensions: { width: number; height: number }) => void;
}

export const VideoPlayer: FC<Props> = ({
  source,
  width,
  height,
  pauseTime,
  ref,
  onResize,
}) => {
  const videoRef = useRef<HTMLVideoElement>(ref?.current ? ref.current : null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width, height });

  useEffect(() => {
    if (videoRef.current && isFinite(pauseTime) && pauseTime >= 0) {
      videoRef.current.currentTime = millesecondsToSeconds(pauseTime);
    }
  }, [pauseTime]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const newDimensions = {
          width: clientWidth,
          height: clientHeight,
        };

        setDimensions(newDimensions);

        if (onResize) {
          onResize(newDimensions);
        }
      }
    };

    updateDimensions();

    window.addEventListener('resize', updateDimensions);

    // Clean up
    return () => window.removeEventListener('resize', updateDimensions);
  }, [onResize]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: width,
        maxHeight: height,
        position: 'relative',
      }}
    >
      <video
        width={dimensions.width}
        height={dimensions.height}
        ref={videoRef}
        style={{ display: 'block', width: '100%', height: 'auto' }}
      >
        {source && <source src={source} />}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
