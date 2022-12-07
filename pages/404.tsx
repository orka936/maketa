import Link from 'next/link'
import Style from '../styles/NotFound.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 10000)
    });

    return (
        <div className={Style.notFound}>
            <h1 className={Style.h1}>Ooooops!</h1>
            <h2 className={Style.h2}>Pogrešna stranica?</h2>
            <p  className={Style.p}>Ova stranica nije dostupna, vrati se na početak klikom <Link href='/' className={Style.ovde}>ovde</Link>!
            <br />Ili automatski za 10 sekundi!
            </p>
            <div className={Style.emoji}></div>
        </div>
    );
}
 
export default NotFound;