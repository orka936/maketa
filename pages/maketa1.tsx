import { useEffect, useState } from 'react';
import Styles from '../styles/maketa.module.css';
import Style from '../styles/modal.module.css';
import database from '../utils/db';
import Image from 'next/image';
import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useRouter } from 'next/router';

import { ref, set, get, onValue } from "firebase/database";
import Modal from '../utils/modal';
import Modal2 from '../utils/help';

import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { FirebaseApp } from '../firebase-config';
import Link from 'next/link';

type User = {
    uid: string
}

const Maketa1 = () => {

    const db = getFirestore(FirebaseApp);//---------------------FIRESTORE

    const [vC1, setVC1] = useState("---");
    const [vC2, setVC2] = useState("---");
    const [inp, setINP] = useState(0);

    const [C1, setC1] = useState(false);
    const [C2, setC2] = useState(false);
    const [k, setK] = useState(false);

    const [up, setUp] = useState(false);

    const [parametar, setParametar] = useState("-");

    const router = useRouter();
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {

        onValue(ref(database, "r2"), (snapshot) => setC1(!!snapshot.val()));
        onValue(ref(database, "r6"), (snapshot) => setC2(!!snapshot.val()));
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

    set(ref(database, "vezba"), 1);
    set(ref(database, "r1"), 1);

    return (
        <>
            <h1 className={Styles.naslov}>Vežba 01: Električno kolo sa 2 kondenzatora</h1>
            <div className={Style.meni}>
                <Modal>
                    <h2>Vežba 1:</h2>
                    <h3>Pločasti kondenzator sastoji se od dve metalne ploče, između kojih se nalazi izolacioni materijal
                        (dielektrik). Njegova kapacitivnost računa se iz C = ε * S/ d, gde je C - kapacitivnost kondenzatora, ε -
                        dielektrična konstanta, S – površina ploče i d – rastojanje između ploča.
                        Jedinica za kapacitivnost je Farad (F). Zbog veličine, u praksi se koriste manje vrednosti: mikrofarad
                        (μF) ili još manja pikofarad (pF).
                    </h3>
                    <h5>Napomena: Za pripremu ove vežbe koristiti odeljak – Kapacitivnost pločastog kondenzatora iz udžbenika.</h5>
                    <h3>1. Izmeriti kapacitivnost priloženog pločastog kondenzatora.</h3>
                    <h3>2. Merenjem mehaničkih dimenzija pločastog kondenzatora odrediti dielektričnu konstantu ε materijala od kog je sačinjen.</h3>
                    <h4>-povezati C1, zatim prikazati rezultate merenja u realnom vremenu, a zatim popuniti tabelu</h4>
                    <h4>-isti postupak važi za C2</h4>
                    <h4>-paralelno povezati C1 i C2, pogledati rezultate merenja, a zatim izračunati i upisati dobijenu vrednost εr-a</h4>
                </Modal>
                <Modal2>
                    <h3>Kapacitivnost pločastog kondenzatora može se izračunati iz izraza C = ε · (S/d), gde je <br /> C – kapacitivnost pločastog kondenzatora <br /> ε – dielektrična konstanta <br />
                    S – površina ploča <br /> d – rastojanje između ploča <br /> ( ε = εo · εr , gde dielektrična konstanta vakuuma iznosi εo = 8,85 · 10 -12 )</h3>
                    <h2>Postupak merenja:</h2>
                    <h4>Napomena: sa obzirom da je ovo online vežba, većina koraka je već odrađeno  npr. 1,2,4,5,6, takođe vrednosti koje dobijate su već pretvorene u piko farade</h4>
                    <h3>1. Postaviti bateriju 9V na maketu (ili priključiti napon iz spoljnog izvora 9V). Kratkospojnik JP1
                        postaviti u odgovarajući položaj.
                        <br />
                        <br />
                        2. Multimetar podesiti na merenje napona, merni opseg 2V. Zatim ga priključiti na rednu
                        stezaljku sa oznakom DVM:2V.
                        <br />
                        <br />
                        3. Na priključke za merenje kapacitivnosti (označene sa Cx, gornji desni ugao makete)
                        priključiti pločasti kondenzator.
                        <br />
                        <br />
                        4. Očitati na voltmetru kapacitivnost pločastog kondenzatora i zapisati rezultate. Merena veličina je u pF (pikofarad), odnosno, ako
                        voltmeter pokazuje npr. 0,314V – izmerena vrednost kapacitivnosti je 314pF.
                        <br />
                        <br />
                        5. Isključiti napajanje makete (dovoljno je samo ukloniti JP1), pa odvojiti pločasti kondenzator.
                        <br />
                        <br />
                        6. Izmeriti debljinu materijala pločastog kondenzatora i dimenzije ploča, pa zapisati vrednosti.
                        <br />
                        <br />
                        7. Na osnovu izmerene kapacitivnosti C (u pF), rastojanja između ploča d (debljina materijala) i
                        površine ploča S, izračunati dielektričnu konstantu ε materijala od kog je napravljen pločasti
                        kondenzator, kao i relativnu dielektričnu konstantu εr (relativna dielektrična konstanta
                        nekog materiala pokazuje koliko puta je kapacitivnost pločastog kondenzatora veća sa tim
                        materijalom, nego sa vazduhom kao dielektrikom za istu površinu S i rastojanje d).
                        <br />
                        <Image src={'/helpC.PNG'} alt="jp" width={600} height={500} className={Style.helpCimg}/>
                    </h3>
                </Modal2>
            </div>
            
            <div className={Styles.main2}>
                <div className={Styles.t}>
                    <button className='button' onClick={() => {
                        if(parametar == '-'){
                            alert("Prvo prikažite rezultate merenja!");
                        }else{
                            if(C1 && !C2){
                                setVC1(parametar);
                            }
                            if(!C1 && C2){
                                setVC2(parametar);
                            }
                        }
                        
                    }}>popuni tabelu</button>
                    <div className={Styles.table}>
                        <div className={`${Styles.ti} ${Styles.mj}`}>S</div>
                        <div className={`${Styles.ti} ${Styles.v}`}>10</div>
                        <div className={`${Styles.ti} ${Styles.mj}`}>d</div>
                        <div className={`${Styles.ti} ${Styles.v}`}>30</div>
                        <div className={`${Styles.ti} ${Styles.mj}`}>C1</div>
                        <div className={`${Styles.ti} ${Styles.v}`}>{vC1}</div>
                        <div className={`${Styles.ti} ${Styles.mj}`}>C2</div>
                        <div className={`${Styles.ti} ${Styles.v}`}>{vC2}</div>
                        <div className={`${Styles.ti} ${Styles.mj} ${Styles.l} ${Styles.dr}`}>εr</div>
                        <div className={`${Styles.ti} ${Styles.v} ${Styles.l} ${Styles.dr}`}>
                            <input type="text" className={`${Styles.inp} ${Styles.dr}`} onChange={(e)=>{
                                setINP(+(e.target.value));
                            }} />
                        </div>
                    </div>
                    <button className='button' onClick={() => {
                        if(inp > 0 && inp < 1000 && vC1 != "---" && vC2 != "---"){
                            alert("Tačno urađena vežba!");
                        }else{
                            alert("Netačno urađena vežba!");
                            setVC1("---");
                            setVC2("---");
                            setC1(false);
                            set(ref(database, "r2"), 0);
                            setC2(false);
                            set(ref(database, "r6"), 0);
                        }
                    }}>proveri</button>
                </div>
                
                <div className={Styles.maketaZaC}>

                    <svg width="465" height="1056" viewBox="0 0 460 1048" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${'Csvg'} ${C2? 'a6' : ''}`}>
                        <path d="M419 646V553H354" stroke="#FF0000" stroke-width="7"/>
                        <path d="M428 646V540H354" stroke="#FF0000" stroke-width="7"/>
                    </svg>
                    <svg width="465" height="1056" viewBox="0 0 460 1048" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${'Csvg'} ${C1? 'a6' : ''}`}>
                        <path d="M419 646V249H354" stroke="#FF0000" stroke-width="7"/>
                        <path d="M428 646V235H354" stroke="#FF0000" stroke-width="7"/>
                    </svg>
                </div>

                <div className={Styles.kontrole2}>
                    <h3>Kondenzator C1:</h3>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${C1 ? 'on' : 'off'}`} onClick={() =>{
                            set(ref(database, "r2"), +!C1);
                            setC1(!C1);
                        }}></button>
                        <p>C1</p>
                    </div>
                    <h3>Kondenzator C2:</h3>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${C2 ? 'on' : 'off'}`} onClick={() =>{
                            set(ref(database, "r6"), +!C2);
                            setC2(!C2);
                        }}></button>
                        <p>C2</p>
                    </div>
                </div>
            </div>
            
            
            <div className={Styles.merenja}>
                <div className={Styles.merenjaBtn}>
                    <button className='button' onClick={() => {
                        onValue(ref(database, "c"), (snapshot) => { setParametar(snapshot.val());});
                    }
                }>prikaži</button>
                </div>
                <p>prikaži rezultate merenja u realnom vremenu</p>
                <div className={Styles.svi}>
                    <div className={Styles.rez}>
                        <p>C= {parametar} pF</p>
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
    <iframe src="http://91.187.148.150:8082/" width={650} height={485} className={`${Styles.frame} ${k? '' : 'none'}`}></iframe>
    <p className={`${Styles.x} ${k? '' : 'none'}`} onClick={()=>{
        setK(false);
    }}>X</p>
</div>

*/
export default Maketa1;