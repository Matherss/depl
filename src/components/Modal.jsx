import React from "react";
import "./Modal.css";

const Modal = ({ active, setActive, setArray, children }) => {
  const closeModal = () => {
    setActive(false);
    setArray([]);
  };
  return (
    <div className={active ? "overlay active" : "overlay"} onClick={closeModal}>
      <div className="modal__active" onClick={(e) => e.stopPropagation()}>
        <div style={{ cursor: "pointer", fontSize: "36px", position: "fixed" }} onClick={closeModal}>
          X
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
