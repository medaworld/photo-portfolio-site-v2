import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

export const EditableTextContainer = styled.div`
  input {
    font: inherit;
    border: none;
    outline: none;
  }
`;

export default function EditableText({ enteredText }) {
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    enteredText === value;
  };

  const handleEditToogle = (field) => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsEditing(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <EditableTextContainer className="title" ref={containerRef}>
      {isEditing ? (
        <input
          type="text"
          value={enteredText}
          name="title"
          onChange={handleInputChange}
        />
      ) : (
        <span onClick={handleEditToogle}>{enteredText}</span>
      )}
    </EditableTextContainer>
  );
}
