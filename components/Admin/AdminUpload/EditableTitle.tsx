import { useState } from 'react';
import { styled } from 'styled-components';

const FileTitle = styled.span`
  font-size: 11px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 90%;
  margin: 5px auto 0;
`;

const FileTitleInput = styled.input`
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  outline: none;
  width: 90%;
  margin: 5px auto 0;
`;

export default function EditableTitle({ file, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(file.title);

  return isEditing ? (
    <FileTitleInput
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={() => {
        onSave(file, name);
        setIsEditing(false);
      }}
      autoFocus
    />
  ) : (
    <FileTitle onClick={() => setIsEditing(true)}>{name}</FileTitle>
  );
}
