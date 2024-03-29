import Style from '../styles/modal.module.css';
import { FC, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface Modal {
    children : any
}

    const Modal: FC<Modal> = ({children}, {childrenHelp}) => {

        const [open, setOpen] = useState(false);

        const handleModal = useCallback(() => {
            setOpen(v => !v);
    }, []);

    return (
        <>
        
        <h2 className={Style.opener} onClick={handleModal}>Zadatak vežbe</h2>
        
        {open &&
        createPortal(
        <div className={Style.modal} onClick={handleModal} >
            <div onClick={(e) => e.stopPropagation()} className={Style.modalContent}>
                <button className={Style.exit} onClick={handleModal}>x</button>
                {children}
                <h5><b><i>legenda</i></b></h5>
                <div className={Style.leg}>
                    <Image src={'/jumper.PNG'} alt="jp" width={100} height={30}/>
                    <h3>džamper (jumper)</h3>
                </div>
                <div className={Style.leg}>
                    <div className={Style.box1Primer}></div>
                    <h3>prespojen jumper</h3>
                </div>
                <div className={Style.leg}>
                    <div className={Style.box2Primer}></div>
                    <h3>prespojen jumper(netacan)</h3>
                </div>
                <div className={Style.leg}>
                    <div className={Style.linePrimer}></div>
                    <h3>tok struje</h3>
                </div>
            </div>
        </div>
        ,
        document.body)}

        </>
    );
}
 
export default Modal;