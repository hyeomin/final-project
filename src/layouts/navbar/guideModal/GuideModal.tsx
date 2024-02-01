import styled from 'styled-components';

type ModalProps = {
  onClose: () => void;
};

function GuideModal({ onClose }: ModalProps) {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* <Swiper
          spaceBetween={20}
          slidesPerView={3}
          pagination={{
            clickable: true
          }}
          navigation
          modules={[Pagination, Navigation]}
        >
          {videos &&
            videos.map((video, index) => (
              <SwiperSlide >

              </SwiperSlide>
            ))}
        </Swiper> */}
      </ModalContent>
    </ModalBackdrop>
  );
}

export default GuideModal;

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
