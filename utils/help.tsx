import Style from '../styles/modal.module.css';
import { FC, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Modal {
    children : any
}

    const Modal: FC<Modal> = ({children}) => {

        const [open, setOpen] = useState(false);

        const handleModal = useCallback(() => {
            setOpen(v => !v);
    }, []);

    return (
        <>

        <h2 className={Style.opener} onClick={handleModal}>help</h2>
        
        {open &&
        createPortal(
        <div className={Style.modal} onClick={handleModal} >
            <div onClick={(e) => e.stopPropagation()} className={Style.modalContent}>
                <button className={Style.exit} onClick={handleModal}>x</button>
                <h2>Dodatno objašnjenje:</h2>
                {children}
                
            </div>
        </div>
        ,
        document.body)}

        </>
    );
}
 
export default Modal;