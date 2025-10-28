import Modal from './Modal.jsx';

function InputModal({children,onClose, open, onSave}) {  

    return (
        <Modal 
            onClose={onClose} 
            open={open} 
            > 
                {children}
                <button onClick={onSave}>Save</button>    
        </Modal>
        )
}   

export default InputModal;