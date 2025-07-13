import { useState, useRef, useEffect, FC } from 'react';
import { Input } from '@/shared/ui-kit/input';
import { useUpdateRecordingTitle } from '../model/useUpdateRecordingTitle';

interface Props {
  id: string;
  title: string;
  isLoading: boolean;
}

export const EditableTitle: FC<Props> = ({ id, title, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const inputRef = useRef<HTMLInputElement>(null);

  const { updateRecordingTitle, isUpdatingTitle } = useUpdateRecordingTitle();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === '' || trimmedTitle === title) {
      setEditedTitle(title);

      setIsEditing(false);

      return;
    }

    await updateRecordingTitle(id, editedTitle);

    setIsEditing(false);
  };

  const onBlur = () => {
    handleSave();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="mr-4 flex max-w-xs items-center">
      {isEditing ? (
        <Input
          className="h-9 font-semibold"
          ref={inputRef}
          disabled={isUpdatingTitle}
          value={editedTitle}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      ) : (
        <div
          className="flex h-9 w-full cursor-pointer items-center rounded-md px-3 py-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={handleEdit}
        >
          <span className="flex-1 font-semibold">{title}</span>
        </div>
      )}
    </div>
  );
};
