import Modal from 'react-modal';
import { IoMdCloseCircle } from 'react-icons/io';
import { styled, useTheme } from 'styled-components';

const CloseButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 0;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.background};
  font-size: 1.2rem;
  line-height: 0;
  border-radius: 50%;
  z-index: 1;

  &:hover {
    opacity: 0.7;
  }
`;

const getCustomStyles = (theme) => ({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(4px)',
    webkitBackdropFilter: 'blur(4px)',
    zIndex: '5',
  },
  content: {
    backgroundColor: theme.tpBackground,
    border: 'none',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '5px',
    maxWidth: '80%',
    maxHeight: '80%',
    padding: '1rem',
    display: 'flex',
  },
});

export default function CustomModal({ modalIsOpen, closeModal, children }) {
  const theme = useTheme();
  const styles = getCustomStyles(theme);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Photos"
      style={styles}
    >
      <CloseButton onClick={closeModal} aria-label="Close Modal">
        <IoMdCloseCircle />
      </CloseButton>
      {children}
    </Modal>
  );
}
