'use client';

import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ModalContainer = styled.div<{ visible?: 'true' }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed; // or absolute, depending on your needs
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25); // example background
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition:
    opacity 0.5s ease,
    visibility 0.5s ease;
  z-index: 100; // adjust as necessary
`;

const ModalBase = styled.div`
  padding: 16px;
  background-color: #414141;
  border-radius: 8px;
`;

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal = (props: ModalProps): JSX.Element | null => {
  const { visible, setVisible, children } = props;

  // Function to close the modal on background click
  const handleBackgroundClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ): void => {
    if (event.currentTarget === event.target) {
      setVisible(false);
    }
  };

  // this breaks sometimes
  if (!document) {
    return null;
  }

  // Get the modal base element
  const modalBase = document.getElementById('modal');

  return modalBase
    ? createPortal(
        <ModalContainer
          visible={visible === true ? 'true' : undefined}
          onClick={handleBackgroundClick}
        >
          <ModalBase onClick={(e) => e.stopPropagation()}>{children}</ModalBase>
        </ModalContainer>,
        modalBase,
      )
    : null;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = (props: ModalProviderProps): JSX.Element => {
  const { children } = props;
  return (
    <div id="modal" style={{ position: 'absolute' }}>
      {children}
    </div>
  );
};

export default Modal;
