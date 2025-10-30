import Model from './Modal';

function ErrorModule({message,onClose, open,mode}) {  

    return <Model
        onClose={onClose} 
        open={open} 
        mode={'error-root'}
        >
            <h2>{message}</h2>   
        </Model>
}   

export default ErrorModule;