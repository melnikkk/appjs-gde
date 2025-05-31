interface Props {
  isHovering: boolean;
  position: Coordinates;
}

export const AddEventHint: React.FC<Props> = ({ isHovering, position }) => {
  return isHovering ? (
    <div
      className="pointer-events-none absolute top-0 z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateX(-50%)',
      }}
    >
      <div className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs whitespace-nowrap text-gray-500 shadow-sm">
        Click to add
      </div>
    </div>
  ) : null;
};
