import styled from 'styled-components';
import theme from '../../../../styles/theme';

type ModalProps = {
  videoId: string;
  onClose: () => void;
};

function YoutubeModal({ videoId, onClose }: ModalProps) {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <iframe
          title="YouTube Video"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </ModalContent>
    </ModalBackdrop>
  );
}

export default YoutubeModal;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${theme.color.lightgray};
  font-size: 20px;
  cursor: pointer;
`;
