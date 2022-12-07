import { useState } from 'react';
import Styles from '../styles/maketa.module.css';

const Maketa = () => {
    
    const [b1, setB1] = useState(false);
    const [b2, setB2] = useState(false);
    const [b3, setB3] = useState(false);
    const [b4, setB4] = useState(false);

    return (
        <div className={Styles.maketa}>
            <button className={`${Styles.button1} ${b1 ? 'on' : 'off'}`} onClick={() => setB1(v => !v)}>
                <div className={Styles.kuglica}></div>
            </button>

            <button className={`${Styles.button2} ${b2 ? 'on' : 'off'}`} onClick={() => setB2(v => !v)}>
                <div className={Styles.kuglica}></div>
            </button>

            <button className={`${Styles.button3} ${b3 ? 'on' : 'off'}`} onClick={() => setB3(v => !v)}>
                <div className={Styles.kuglica}></div>
            </button>

            <button className={`${Styles.button4} ${b4 ? 'on' : 'off'}`} onClick={() => setB4(v => !v)}>
                <div className={Styles.kuglica}></div>
            </button>
        </div>
    );
}

export default Maketa;