// KebabMenuModal.tsx
import React, { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import "./index.scss"; // Import the same SCSS file used for Modal component

interface KebabMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit?: () => void;
  coordinates: { x: number; y: number };
  classModal?: string;
  
}

const KebabMenuModal: React.FC<KebabMenuModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  coordinates,
  classModal,
  onEdit,
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === document.querySelector(".modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal ${classModal ? classModal : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        style={{
          position: "absolute",
          top: coordinates.y,
          left: coordinates.x,
        }}
      >
        <div className="modal-header"></div>
        <div className="modal-content">
          <div className="modal-item">
            <div className="icon" onClick={onEdit}>
              <MdModeEdit />
              <span className="icon-label">Edit</span>
            </div>
          </div>

          <div className="modal-item">
            <div className="icon" onClick={onDelete}>
              <MdDelete />
              <span className="icon-label">Delete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KebabMenuModal;
