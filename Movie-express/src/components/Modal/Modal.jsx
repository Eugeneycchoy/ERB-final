import "../Modal/Modal.css";

export default function Modal({ handleCloseModal }) {
  return (
    <>
      <div
        className="modal-background-overlay"
        onClick={handleCloseModal}
      ></div>
      <div className="modal-container">
        <h1>This is a Modal :D</h1>
      </div>
    </>
  );
}
