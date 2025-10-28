import Model from './Modal';

function ErrorModule({message,onClose, open}) {  

    return <Model
        onClose={onClose} 
        open={open} 
        >
            <h2>{message}</h2>   
        </Model>
}   

export default ErrorModule;