import { useEffect, useState } from 'react';
import Styles from '../styles/maketa.module.css';
import Style from '../styles/modal.module.css'
import database from '../utils/db';
import Image from 'next/image';
import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useRouter } from 'next/router';

import { ref, set, onValue } from "firebase/database";
import Modal from '../utils/modal';
import Modal2 from '../utils/help';

import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { FirebaseApp } from '../firebase-config';
import Link from 'next/link';


type User = {
    uid: string
}

const Maketa5 = () => {

    const db = getFirestore(FirebaseApp);//---------------------FIRESTORE
    
    const [k, setK] = useState(false);

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

    const router = useRouter();
    const [user, setUser] = useState<User | undefined>();
    

    useEffect(() => {
        onValue(ref(database, "r1"), (snapshot) => setB1b(!!snapshot.val()));
        onValue(ref(database, "r2"), (snapshot) => setB2(!!snapshot.val()));
        onValue(ref(database, "r3"), (snapshot) => setB3(!!snapshot.val()));
        onValue(ref(database, "r4"), (snapshot) => setB4a(!!snapshot.val()));
        onValue(ref(database, "r5"), (snapshot) => setB6(!!snapshot.val()));
        onValue(ref(database, "r6"), (snapshot) => setB8(!!snapshot.val()));
        onValue(ref(database, "r7"), (snapshot) => setB9(!!snapshot.val()));
    }, []);

    useEffect(() => {
        const accessToken = userAccessToken();

        if(!accessToken){
            router.push('/');
        }

        try{
            const [userInfo] = fetchUser();
            setUser(userInfo);
        }
        catch(e){
            console.log(e);
        }
        
    }, [router]);

    const checkReservation = async () => {

        const usersRef = await collection(db, "user");
        const documents = await getDocs(usersRef);
        let pom = false;


        if(!user) return;

        documents.forEach((data: any) => {

            let terminDo = new Date(data.data().Date);
            terminDo.setHours(terminDo.getHours() + 1);

            if (data.data().Id === user.uid && new Date(Date.now()) > new Date(data.data().Date) && new Date(Date.now()) < terminDo){
                pom = true;
            }
            
        });
        if(!pom){
            router.push('/');
        }
        
    }
    checkReservation();


    set(ref(database, "vezba"), 5);


    return (
        <>
            <h1 className={Styles.naslov}>Vežba 05: Električno kolo sa sijalicom</h1>
            <div className={Style.meni}>
                <Modal>
                    <h2>Vežba 5:</h2>
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
                <Modal2>
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
                </Modal2>
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
                        ${'svg'}
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
                        ${'svg'}
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
                        <p className={Styles.jpName}>JP1</p>
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
                        <p className={Styles.jpName}>JP4</p>
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
                    <button className='button' onClick={() => {
                        
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
                        <p>Vr= {parametar ? parametar : "-"} V</p>
                    </div>
                    <div className={Styles.rez}>
                        <p>Vs= {parametar2 ? parametar2 : "-"} V</p>
                    </div>
                    <div className={Styles.rez}>
                        <p>Rs= {parametar3 ? parametar3 : "-"} Ω</p>
                    </div>
                    <div className={Styles.rez}>
                        <p>I= {+parametar4*1000} mA</p>
                    </div>
                </div>
            </div>
            
            <div className={Styles.live}>
                <Link href={"http://91.187.148.150:8081"} legacyBehavior>
                    <a target='_blank'>kamera</a>
                </Link>
            </div>
        </>
    );
}
/*
<div className={Styles.live}>
                
<p className={`${k? 'none' : ''}`} onClick={()=>{
    setK(true);
}}>kamera</p>


<p className={`${Styles.x} ${k? '' : 'none'}`} onClick={()=>{
    setK(false);
}}>X</p>
</div>
*/
export default Maketa5;