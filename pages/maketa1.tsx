import { useEffect, useState } from 'react';
import Styles from '../styles/maketa.module.css';
import database from '../utils/db';
import Image from 'next/image';

import { ref, set, get, onValue } from "firebase/database";
import Modal from '../utils/modal';


const Maketa1 = () => {

    const [vezba, setVezba] = useState('');

    const [C1, setC1] = useState(false);
    const [C2, setC2] = useState(false);

    const [up, setUp] = useState(false);

    const [parametar, setParametar] = useState("");
    const [parametar2, setParametar2] = useState("");
    const [parametar3, setParametar3] = useState("");
    const [parametar4, setParametar4] = useState("");

    

    useEffect(() => {

        onValue(ref(database, "C1"), (snapshot) => setC1(!!snapshot.val()));
        onValue(ref(database, "C2"), (snapshot) => setC2(!!snapshot.val()));
        onValue(ref(database, "vezba"), (snapshot) => setVezba(snapshot.val()));
    }, []);

    set(ref(database, "vezba"), 1);

    return (
        <>
            <h1 className={Styles.naslov}>Vežba 01: Električno kolo sa 2 kondenzatora</h1>
            <Modal>
                <h2>Vežba 1:</h2>
                <h3>Ova vežba je malo drugačija od ostalih, kao š</h3>
            </Modal>

                <div className={Styles.sema}>

                    <div className={Styles.cc} onClick={()=>{
                        
                        set(ref(database, "C1"), +!C1);
                        setC1(!C1);
                        
                    }}>
                        <Image src="/kondenzator.png" width={524} height={505} className={`${Styles.slikaKond} ${C1? Styles.cActive : Styles.a}`} alt=''></Image>
                    </div>
                    
                    <div className={Styles.cc} onClick={() =>{
                        
                        set(ref(database, "C2"), +!C2);
                        setC2(!C2);
                        
                    }}>
                        <Image src="/kondenzator2.png" width={524} height={505} className={`${Styles.slikaKond} ${C2? Styles.cActive : Styles.a}`} alt=''></Image>
                    </div>
                    <div className={Styles.maketaZaC}></div>
                </div>
            
        </>
    );
}

export default Maketa1;