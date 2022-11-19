import { createPortal } from "react-dom";

type ModalProps = {
  hideModal: () => void;
  children: React.ReactNode;
};

const Modal = ({ hideModal, children }: ModalProps) => {
  return (
    <>
      <div className="custom-modal" onClick={hideModal}></div>
      <div className="overlay">{children}</div>
    </>
  );
};

function ModalPortal({ hideModal, children }: ModalProps) {
  return createPortal(
    <Modal hideModal={hideModal}>{children}</Modal>,
    document.getElementById("modal")!
  );
}

export default ModalPortal;
