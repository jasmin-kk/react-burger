import React, { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={style.modal}>
        <div className={style.header}>
          <h2 className="text text_type_main-large">{title}</h2>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        <div className={style.content}>{children}</div>
      </div>
    </>,
    document.getElementById('modal-root') as HTMLElement
  );
};
