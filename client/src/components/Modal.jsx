import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import "./Model.css";

function Model({ onClose, open, children, mode, ...props }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [open]);

  if (props.pop) {
    setTimeout(() => {
      onClose();
    }, 1500);
  }

  return createPortal(
    <>
      <div className={props.pop ? null : "dialog-backdrop"}>
        <dialog
          className={
            props.pop
              ? "pop-module"
              : mode === "error-root"
              ? "error-module"
              : "input-module"
          }
          ref={dialogRef}
          onClose={onClose}
        >
          {children}
          {props.pop ? null : <button onClick={onClose}>Close</button>}
        </dialog>
      </div>
    </>,
    document.getElementById(`${mode}`)
  );
}

export default Model;
