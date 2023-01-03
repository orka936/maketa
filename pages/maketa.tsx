import { useEffect, useState } from 'react';
import Styles from '../styles/maketa.module.css';
import database from '../utils/db';
import { ref, set, onValue } from "firebase/database";


const Maketa = () => {
    
    const [r1, setR1] = useState(false);
    const [r2, setR2] = useState(false);
    const [r3, setR3] = useState(false);
    const [r4, setR4] = useState(false);

    const [vol, setVol] = useState(false);
    const [parametar, setParametar] = useState("");

    useEffect(() => {
        onValue(ref(database, "r1"), (snapshot) => setR1(!!snapshot.val()));
        onValue(ref(database, "r2"), (snapshot) => setR2(!!snapshot.val()));
        onValue(ref(database, "r3"), (snapshot) => setR3(!!snapshot.val()));
        onValue(ref(database, "r4"), (snapshot) => setR4(!!snapshot.val()));
        onValue(ref(database, "vol"), (snapshot) => setVol(!!snapshot.val()));
    }, []);

    return (
        <section>
            <div className={Styles.maketa}>
                <button className={`${Styles.button1} ${r1 ? 'on' : 'off'}`} onClick={() => set(ref(database, "r1"), +!r1)}>
                    <div className={Styles.kuglica}></div>
                </button>

                <button className={`${Styles.button2} ${r2 ? 'on' : 'off'}`} onClick={() => set(ref(database, "r2"), +!r2)}>
                    <div className={Styles.kuglica}></div>
                </button>

                <button className={`${Styles.button3} ${r3 ? 'on' : 'off'}`} onClick={() => set(ref(database, "r3"), +!r3)}>
                    <div className={Styles.kuglica}></div>
                </button>

                <button className={`${Styles.button4} ${r4 ? 'on' : 'off'}`} onClick={() => set(ref(database, "r4"), +!r4)}>
                    <div className={Styles.kuglica}></div>
                </button>
            </div>
            <div className={Styles.merenja}>
                <button className={`${Styles.merenja} ${vol ? 'off' : 'on'}`} onClick={() => {
                    setVol(true);
                    onValue(ref(database, "voltage"), (snapshot) => { setParametar(snapshot.val()); });
                }} >prikaži</button>

                <p>prikaži rezultate merenja u realnom vremenu</p>
                <div className={Styles.rez}>
                    <p>{parametar} V</p>
                </div>
            </div>
        </section>
    );
}

export default Maketa;