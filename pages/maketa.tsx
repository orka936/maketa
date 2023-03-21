import { useEffect, useState } from 'react';
import Styles from '../styles/maketa.module.css';
import database from '../utils/db';

import { ref, set, onValue } from "firebase/database";


const Maketa = () => {

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
        <div className={Styles.uputstvo}><a onClick={()=>setUp(!up)}><b>UPUTSTVO</b></a></div>
        <div className={up ? "zad" : "none"}>
            <h2>Zadatak 3:</h2>
            <h4>Cilj zadatka jeste povezati kolo, tako da se maketa napaja baterijom, da struja prolazi kroz sijalicu,
                <br />slučaj a: struja prolazi kroz R1 <br /> slučaj b: struja ne prolazi kroz R1
            </h4>
            <p><b><i>legenda</i></b></p>
            <div className={Styles.leg}>
                <div className={Styles.box1Primer}></div>
                <h3>prespojen jumper</h3>
            </div>
            <div className={Styles.leg}>
                <div className={Styles.box2Primer}></div>
                <h3>prespojen jumper(netacan)</h3>
            </div>
            <div className={Styles.leg}>
                <div className={Styles.linePrimer}></div>
                <h3>tok struje</h3>
            </div>
            
            <button className={Styles.btnUp} onClick={()=>setUp(false)}>X</button>
        </div>
            <div className={Styles.main}>
                <div className={Styles.maketa}>

                    <svg width="524" height="505" viewBox="0 0 524 505" fill="none" xmlns="http://www.w3.org/2000/svg" className={`
                        ${b1b ? "a1" : ""}
                        ${(b1b && b2 && !b3) ? "a2" : ""}
                        ${(b1b && b2 && b4a && !b3) ? "a3" : ""}
                        ${(b1b && b2 && b4a && !b3 && !b5 && b6 && !b11a) ? "a4" : ""}
                        ${(b1b && b2 && b4a && !b3 && !b5 && b6 && !b7 && b8 && !b7) ? "a5" : ""}
                        ${(b1b && b2 && b4a && !b3 && !b5 && b6 && !b7 && b8 && !b7 && b9) ? "a6" : ""}
                    `}>
                        <path d="M101.5 411V327.5H45L45.5 178.5H102V190H204.5V179H491.5L492 473H101.5V422" stroke="#FF0000" strokeWidth="5"/>
                    </svg>
                    <svg width="524" height="505" viewBox="0 0 524 505" fill="none" xmlns="http://www.w3.org/2000/svg" className={`
                        ${b1b ? "a1" : ""}
                        ${(b1b && b2 && b3) ? "a2a" : ""}
                        ${(b1b && b2 && b4a && b3) ? "a3a" : ""}
                        ${(b1b && b2 && b4a && b3 && !b5 && b6 && !b11a) ? "a4a" : ""}
                        ${(b1b && b2 && b4a && b3 && !b5 && b6 && !b7 && b8 && !b7) ? "a5a" : ""}
                        ${(b1b && b2 && b4a && b3 && !b5 && b6 && !b7 && b8 && !b7 && b9) ? "a6a" : ""}
                    `}>
                        <path d="M101.5 411V327.5H45L45.5 178.5H102V233L174 232.5V190H204.5V179H491.5L492 473L101.5 473.5V422" stroke="#FF0000" strokeWidth="5"/>
                    </svg>
                    
                    
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
                <div className={Styles.kontrole}>
                    <div className={Styles.btn3}>
                        <button className={`${Styles.kuglica} ${b1a ? 'on' : 'off'}`} onClick={() => {
                            set(ref(database, "r1"), 0);
                            setB1a(true);
                            setB1b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${(b1a || b1b) ? 'on' : 'off'}`} onClick={() =>{ 
                            set(ref(database, "r1"), 0);
                            setB1a(false);
                            setB1b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${b1b ? 'on' : 'off'}`} onClick={() => {
                            set(ref(database, "r1"), 1);
                            setB1a(false);
                            setB1b(true);
                        }}></button>
                        <p>JP1</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b2 ? 'on' : 'off'}`} onClick={() =>{
                            set(ref(database, "r2"), +!b2);
                            setB2(!b2);
                        }}></button>
                        <p>JP2</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b3 ? 'on' : 'off'}`} onClick={() => {
                            set(ref(database, "r3"), +!b3);
                            setB3(!b3);
                        }}></button>
                        <p>JP3</p>
                    </div>
                    <div className={Styles.btn3}>
                        <button className={`${Styles.kuglica} ${b4a ? 'on' : 'off'}`} onClick={() => {
                            set(ref(database, "r4"), 1);
                            setB4a(true);
                            setB4b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${(b4a || b4b) ? 'on' : 'off'}`} onClick={() => {
                            set(ref(database, "r4"), 0);
                            setB4a(false);
                            setB4b(false);
                        }}></button>
                        <button className={`${Styles.kuglica} ${b4b ? 'on' : 'off'}`} onClick={() => {
                            set(ref(database, "r4"), 0);
                            setB4a(false);
                            setB4b(true);
                        }}></button>
                        <p>JP4</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b5 ? 'on' : 'off'}`} onClick={() => setB5(!b5)}></button>
                        <p>JP5</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b6 ? 'on' : 'off'}`} onClick={() => {
                            set(ref(database, "r5"), +!b6);
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
                            set(ref(database, "r6"), +!b8);
                            setB8(!b8);
                        }}></button>
                        <p>JP8</p>
                    </div>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${b9 ? 'on' : 'off'}`} onClick={() => {
                            set(ref(database, "r7"), +!b9);
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
            


            <div className={Styles.merenja}>
                <div className={Styles.merenjaBtn}>
                    <button onClick={() => {
                        
                        if(((b1a || b1b) && b2 && b3 && b4a && b6 && b8 && b9 && +b5==0 && +b7==0 && +b10a==0 && +b10b==0 && +b11a==0 && +b11b==0 && +b12==0) || ((b1a || b1b) && b2 && b4a && b6 && b8 && b9 && +b5==0 && +b7==0 && +b10a==0 && +b10b==0 && +b11a==0 && +b11b==0 && +b12==0))
                        {
                            console.log("Dobro uradjeno!");
                            onValue(ref(database, "Vr"), (snapshot) => { setParametar(snapshot.val());});
                            onValue(ref(database, "Vs"), (snapshot) => { setParametar2(snapshot.val());});
                            onValue(ref(database, "R"), (snapshot) => { setParametar3(snapshot.val());});
                            onValue(ref(database, "I"), (snapshot) => { setParametar4(snapshot.val());});
                        }
                        else
                        {
                            alert("Kolo nije dobro povezano!");
                        }

                    }}>proveri i prikaži</button>
                </div>
                <p>prikaži rezultate merenja u realnom vremenu</p>
                <div className={Styles.svi}>
                    <div className={Styles.rez}>
                        <p>Ur= {parametar} V</p>
                    </div>
                    <div className={Styles.rez}>
                        <p>Us= {parametar2} V</p>
                    </div>
                    <div className={Styles.rez}>
                        <p>R= {parametar3} Ω</p>
                    </div>
                    <div className={Styles.rez}>
                        <p>I= {+parametar4*1000} mA</p>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Maketa;