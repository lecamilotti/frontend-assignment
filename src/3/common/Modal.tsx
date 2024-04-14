import React from "react";
import "./index.scss";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onButtonClick: () => void;
  buttonLabel: string;
  showButton: boolean;
  
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  onButtonClick,
  buttonLabel,
  showButton,
  
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-content">{children}</div>
        {showButton && (
          <div className="modal-footer">
            <button className="modal-button" onClick={onButtonClick}>
              {buttonLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
