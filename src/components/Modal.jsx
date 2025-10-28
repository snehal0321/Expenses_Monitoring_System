import  { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import './Model.css';

function Model({onClose, open ,children}) {  
    const dialogRef = useRef(null); 


     useEffect(() => {
        const dialog = dialogRef.current;
        if (open) {
        if (!dialog.open) dialog.showModal();
        } else {
        if (dialog.open) dialog.close();
        }
    }, [open]);


    return createPortal(
        <>
            <div className='dialog-backdrop'>
                <dialog
                    className="error-module" 
                    ref={dialogRef}
                    onClose={onClose}
                >
                    {children}
                    <button onClick={onClose}>Close</button>    
                    
                </dialog>
            </div>
        </>,
        document.getElementById('error-root')
    );
}   

export default Model;