import Style from '../styles/modal.module.css';
import { FC, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

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
                {children}
                <h2>Džamperi:</h2>
                <h3>
                    Kontakt sa dve iglice : <br />
                    kada su iglice
                    slobodne, kolo između njih je otvoreno
                    (prekinuto, u prekidu). Kada se na iglice
                    postavi kratkospojnik (džamper, engl.
                    Jumper) te dve iglice su međusobno
                    spojene (zatvoreno, nema prekida).
                    Kontakt sa dve iglice i kratkospojnikom
                    ponaša se kao prekidač (OTVOREN :
                    nema kratkospojnika, ZATVOREN :
                    postavljen kratkospojnik).
                </h3>
                <Image src={'/help1.PNG'} alt="jp" width={500} height={300} className={Style.help1}/>
                <h3>
                    Kontakt sa tri iglice se koristi kao
                    prebacivač (preklopnik) za izbor sa DVE
                    opcije.
                    <br />
                    Primer je kontakt
                    sa tri iglice JP1: postavljanjem
                    kratkospojnika u desni položaj, (srednja
                    iglica JP1 vezana na BAT. (slika 3, pod b))
                    tako da se maketa napaja iz sopstvene
                    baterije (oznaka BAT.9V). Postavljanjem
                    kratkospojnika u levi položaj, na maketu
                    je preko redne stezaljke K1 moguće
                    priključiti napon iz nekog spoljnjog izvora
                    (oznaka EXT. (slika 3, pod c), pa maketa
                    dobija napajanje iz njega).
                </h3>
                <Image src={'/help2.PNG'} alt="help1" width={600} height={250} className={Style.help2}/>
            </div>
        </div>
        ,
        document.body)}

        </>
    );
}
 
export default Modal;