import { useEffect, useState } from 'react';
import Styles from '../styles/maketa.module.css';
import database from '../utils/db';
import Image from 'next/image';

import { ref, set, onValue } from "firebase/database";
import Modal from '../utils/modal';


const Maketa1 = () => {

    const [b1a, setB1a] = useState(false);
    const [b1b, setB1b] = useState(false);
    const [b2, setB2] = useState(false);
    const [b3, setB3] = useState(false);
    const [b4a, setB4a] = useState(false);
    const [b4b, setB4b] = useState(false);
    const [b5, setB5] = useState(false);
    const [b6, setB6] = useState(false);
    const [b7, setB7] = useState(false);
    const [b8, setB8] = useState(false);
    const [b9, setB9] = useState(false);
    const [b10a, setB10a] = useState(false);
    const [b10b, setB10b] = useState(false);
    const [b11a, setB11a] = useState(false);
    const [b11b, setB11b] = useState(false);
    const [b12, setB12] = useState(false);

    const [up, setUp] = useState(false);

    const [parametar, setParametar] = useState("");
    const [parametar2, setParametar2] = useState("");
    const [parametar3, setParametar3] = useState("");
    const [parametar4, setParametar4] = useState("");

    

    useEffect(() => {
        onValue(ref(database, "r1"), (snapshot) => setB1b(!!snapshot.val()));
        onValue(ref(database, "r2"), (snapshot) => setB2(!!snapshot.val()));
        onValue(ref(database, "r3"), (snapshot) => setB3(!!snapshot.val()));
        onValue(ref(database, "r4"), (snapshot) => setB4a(!!snapshot.val()));
        onValue(ref(database, "r5"), (snapshot) => setB6(!!snapshot.val()));
        onValue(ref(database, "r6"), (snapshot) => setB8(!!snapshot.val()));
        onValue(ref(database, "r7"), (snapshot) => setB9(!!snapshot.val()));
    }, []);

    return (
        <>
            <h1 className={Styles.naslov}>Vežba 01: Električno kolo sa 2 kondenzatora</h1>
            <Modal>
                <h2>Vežba 1:</h2>
                <h3>Povezati kolo, tako da se maketa napaja baterijom(BAT. 9V) i da struja prolazi kroz sijalicu </h3>

                <h3>
                    slučaj a: JP3 je uključen, struja ne prolazi kroz R1, očitati rezultate merenja struje, napona Vs - na sijalici, Vr - na otporniku,
                    <br />Izračunati (Omov zakon) otpornost sijalice Rs.
                </h3>

                <h3>
                    Zatim slučaj b: isključiti JP3, sada struja prolazi kroz R1, ponovno očitati rezultate merenja struje i napona,
                    <br />Ponovno izračunati (Omov zakon) otpornost sijalice Rs.
                </h3>

                <h2>
                    Pitanja:
                </h2>
                <h3>
                    Da li je dobijena vrednost otpornosti sijalice ista
                    u slučaju a i b ?
                </h3>
                <h3>
                    Štaje to PTC (pozitivni temperaturni
                    koeficijent)?
                </h3>
                <h3>
                    Objasniti dobijene rezultate.
                </h3>
            </Modal>

            <div className={Styles.main}>
                <div className={Styles.noviLeft}>
                    <div className={Styles.noviTop}>
                        <Image src="/kondenzator.png" width={524} height={505} className={Styles.slikaKond} alt='maketa'></Image>
                        <Image src="/kondenzator2.png" width={524} height={505} className={Styles.slikaKond} alt='maketa'></Image>
                    </div>
                    <div className={Styles.maketa}>

                        <div className={`${Styles.box} ${Styles.c1a} ${Styles.wrong} ${b1a ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c1b} ${b1b ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c2} ${b2 ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c3} ${b3 ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c4a} ${b4a ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c4b} ${Styles.wrong} ${b4b ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c5}  ${Styles.wrong}  ${b5 ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c6} ${b6 ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c7} ${Styles.wrong} ${b7 ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c8} ${b8 ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c9} ${b9 ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c10a} ${Styles.wrong} ${b10a ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c10b} ${Styles.wrong} ${b10b ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c11a} ${Styles.wrong} ${b11a ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c11b} ${Styles.wrong} ${b11b ? 'On' : 'Off'}`}></div>
                        <div className={`${Styles.box} ${Styles.c12} ${Styles.wrong} ${b12 ? 'On' : 'Off'}`}></div>
                    </div>
                </div>
                
                <div className={Styles.kontrole2}>
                    <div className={Styles.gap}></div>
                    <div className={Styles.btn3}>
                        <button className={`${Styles.kuglica} ${b1a ? 'on' : 'off'}`} onClick={() => {
                            setB1a(true);
                            setB1b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${(b1a || b1b) ? 'on' : 'off'}`} onClick={() =>{ 
                            setB1a(false);
                            setB1b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${b1b ? 'on' : 'off'}`} onClick={() => {
                            setB1a(false);
                            setB1b(true);
                        }}></button>
                        <p className={Styles.jpName}>JP1</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b2 ? 'on' : 'off'}`} onClick={() =>{
                            setB2(!b2);
                        }}></button>
                        <p>JP2</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b3 ? 'on' : 'off'}`} onClick={() => {
                            setB3(!b3);
                        }}></button>
                        <p>JP3</p>
                    </div>
                    <div className={Styles.btn3}>
                        <button className={`${Styles.kuglica} ${b4a ? 'on' : 'off'}`} onClick={() => {
                            setB4a(true);
                            setB4b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${(b4a || b4b) ? 'on' : 'off'}`} onClick={() => {
                            setB4a(false);
                            setB4b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${b4b ? 'on' : 'off'}`} onClick={() => {
                            setB4a(false);
                            setB4b(true);
                        }}></button>
                        <p className={Styles.jpName}>JP4</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b5 ? 'on' : 'off'}`} onClick={() => setB5(!b5)}></button>
                        <p>JP5</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b6 ? 'on' : 'off'}`} onClick={() => {
                            setB6(!b6);
                        }}></button>
                        <p>JP6</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b7 ? 'on' : 'off'}`} onClick={() => setB7(!b7)}></button>
                        <p>JP7</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b8 ? 'on' : 'off'}`} onClick={() => {
                            setB8(!b8);
                        }}></button>
                        <p>JP8</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b9 ? 'on' : 'off'}`} onClick={() => {
                            setB9(!b9);
                        }}></button>
                        <p>JP9</p>
                    </div>
                    <div className={Styles.btn3}>
                        <button className={`${Styles.kuglica} ${b10a ? 'on' : 'off'}`} onClick={() => {
                            setB10a(true);
                            setB10b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${(b10a || b10b) ? 'on' : 'off'}`} onClick={() => {
                            setB10a(false);
                            setB10b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${b10b ? 'on' : 'off'}`} onClick={() => {
                            setB10a(false);
                            setB10b(true);
                        }}></button>
                        <p>JP10</p>
                    </div>
                    <div className={Styles.btn3}>
                        <button className={`${Styles.kuglica} ${b11a ? 'on' : 'off'}`} onClick={() => {
                            setB11a(true);
                            setB11b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${(b11a || b11b) ? 'on' : 'off'}`} onClick={() => {
                            setB11a(false);
                            setB11b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${b11b ? 'on' : 'off'}`} onClick={() => {
                            setB11a(false);
                            setB11b(true);
                        }}></button>
                        <p>JP11</p>
                    </div>
                        <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b12 ? 'on' : 'off'}`} onClick={() => setB12(!b12)}></button>
                        <p className={Styles.pDv}>JP12</p>
                    </div>
                </div>
            </div>
            


            
        </>
    );
}

export default Maketa1;