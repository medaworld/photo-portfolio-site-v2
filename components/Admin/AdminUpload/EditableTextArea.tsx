import { useState } from 'react';
import { styled } from 'styled-components';

const FileDescription = styled.span`
  font-size: 11px;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 90%;
  margin: 5px auto 0;
  margin-bottom: 1rem;
`;

const FileDescriptionTextArea = styled.textarea`
  font-size: 11px;
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
  width: 90%;
  margin: 5px auto 0;
  resize: none;
`;

export default function EditableDescription({ file, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(file.description || '');

  return isEditing ? (
    <FileDescriptionTextArea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      onBlur={() => {
        onSave(file, description);
        setIsEditing(false);
      }}
      autoFocus
    />
  ) : (
    <FileDescription onClick={() => setIsEditing(true)}>
      {description || 'Add a description'}
    </FileDescription>
  );
}
