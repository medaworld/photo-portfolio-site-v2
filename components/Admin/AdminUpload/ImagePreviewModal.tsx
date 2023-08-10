import Image from 'next/image';
import { ImageContainer } from '../../common/ImageContainer';
import Modal from 'react-modal';

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
    border: '1px solid #ccc',
    maxWidth: '80%',
    maxHeight: '80%',
    padding: '5px',
  },
};

export default function ImagePreviewModal({
  modalIsOpen,
  closeModal,
  selectedFile,
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Image Preview"
      style={customStyles}
    >
      {selectedFile && (
        <ImageContainer>
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt={selectedFile.name}
            width={selectedFile.width || 400}
            height={selectedFile.height || 400}
            className={'image'}
          />
        </ImageContainer>
      )}
    </Modal>
  );
}
