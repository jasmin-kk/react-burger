import React, {FC} from 'react';
import style from './modal-overlay.module.css';

interface ModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  return <div className={style.overlay} onClick={onClose} />;
};
