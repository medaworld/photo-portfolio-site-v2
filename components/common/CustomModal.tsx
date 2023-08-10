import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { styled } from 'styled-components';

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.primary};
  opacity: 0.7;
  transition: opacity 0.3s ease;
  font-size: 1rem;

  &:hover {
    opacity: 1;
  }
`;

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: '5',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: '4px',
    maxWidth: '80%',
    maxHeight: '80%',
    padding: '15px',
  },
};

export default function CustomModal({ modalIsOpen, closeModal, children }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Photos"
      style={customStyles}
    >
      <CloseButton onClick={closeModal} aria-label="Close Modal">
        <FaTimes />
      </CloseButton>
      {children}
    </Modal>
  );
}
