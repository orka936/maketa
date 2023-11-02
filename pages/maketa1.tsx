import { useEffect, useState } from 'react';
import Styles from '../styles/maketa.module.css';
import Style from '../styles/modal.module.css';
import database from '../utils/db';
import Image from 'next/image';

import { ref, set, get, onValue } from "firebase/database";
import Modal from '../utils/modal';
import Modal2 from '../utils/help';


const Maketa1 = () => {

    const [vezba, setVezba] = useState('');

    const [C1, setC1] = useState(false);
    const [C2, setC2] = useState(false);

    const [up, setUp] = useState(false);

    const [parametar, setParametar] = useState("");

    

    useEffect(() => {

        onValue(ref(database, "r2"), (snapshot) => setC1(!!snapshot.val()));
        onValue(ref(database, "r6"), (snapshot) => setC2(!!snapshot.val()));
        onValue(ref(database, "vezba"), (snapshot) => setVezba(snapshot.val()));
    }, []);

    set(ref(database, "vezba"), 1);

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
                <div className={Styles.maketaZaC}>

                    <svg width="465" height="1056" viewBox="0 0 460 1048" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${'Csvg'} ${C1? 'a6' : ''}`}>
                        <path d="M419 646V553H354" stroke="#FF0000" stroke-width="7"/>
                        <path d="M428 646V540H354" stroke="#FF0000" stroke-width="7"/>
                    </svg>
                    <svg width="465" height="1056" viewBox="0 0 460 1048" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${'Csvg'} ${C2? 'a6' : ''}`}>
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
                        <p>JP1</p>
                    </div>
                    <h3>Kondenzator C2:</h3>
                    <div className={Styles.btn}>
                        <button className={`${Styles.kuglica} ${C2 ? 'on' : 'off'}`} onClick={() =>{
                            set(ref(database, "r6"), +!C2);
                            setC2(!C2);
                        }}></button>
                        <p>JP2</p>
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
                        <p>C= {parametar ? parametar : "-"} pF</p>
                    </div>
                </div>
            </div>
            <div className={Styles.live}>
                <a href=''>live</a>
            </div>
        </>
    );
}

export default Maketa1;