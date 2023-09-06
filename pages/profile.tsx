import  Styles  from '../styles/profile.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Profile = () => {

    const router = useRouter();
    const [user, setUser] = useState({});

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

    const signOut = () => {
        localStorage.clear();
        router.push('/');
    }

    return (
        <div className={Styles.full}>
            <div className={Styles.nav}>
                <h1 className={Styles.naslov}>Vežbe</h1>
                <div className={Styles.navBar}>
                <Link href="./profile" className={'side active'}>pregled</Link>
                    <Link href="./zakazivanje" className={'side'}>zakazivanje</Link>
                    <Link href="./maketa" className={'side'}>probna maketa</Link>
                    <Link href="./portal" className={'side'}>vežbanje</Link>
                </div>
            </div>

            <div className={Styles.right}>
                <div className={Styles.dashboard}>
                    <div className={Styles.basicInfo}>
                        <h2>{user?.displayName}</h2>
                    </div>
                    
                    <Image src="/logout.png" width={90} height={90} alt="help" className={Styles.LogOutImg} onClick={signOut}></Image>
                </div>
                <h3 className={Styles.ov}>Dashboard</h3>
                <div className={Styles.main}>
                    <div className={Styles.vezbe}>
                        <div className={Styles.vezba}>
                            <div>
                                <h1>Vežba: 05</h1>
                                <p>Elektricno kolo sa sijalicom i sa (ili bez) otpornika R1.</p>
                            </div>
                            <Image src="/maketa5.png" width={524} height={505} className={Styles.slikaMakete} alt='maketa'></Image>
                        </div>
                        <div className={Styles.vezba}>
                            <div>
                                <h1>Vežba: 02</h1>
                                <p>Elektricno kolo bez sijalice i sa otpornikom R2.</p>
                            </div>
                            <Image src="/maketa2.jpg" width={524} height={505} className={Styles.slikaMakete} alt='maketa'></Image>
                        </div>
                        <div className={Styles.vezba}>
                            <div>
                                <h1>Vežba: 07</h1>
                                <p>Kolo sa ili bez sijalice i sa ili bez otpornika R3.</p>
                            </div>
                            <Image src="/maketa5.png" width={524} height={505} className={Styles.slikaMakete} alt='maketa'></Image>
                        </div>
                    </div>
                    <div className={Styles.evidencija}>
                        <div className={Styles.summary}>
                            <h2>Rezime vežbi</h2>
                            <div className={Styles.table}>
                                <div className={Styles.linija}>
                                    <h3>Naziv</h3>
                                    <div className={Styles.desno}>
                                    <h3>Br. vezbe</h3>
                                    <h3>Tezina</h3>
                                    </div>
                                </div>
                                <hr />


                                <div className={Styles.linija}>
                                    <p>Vežba:   Električno kolo - merenja</p>
                                    <div className={Styles.desno}>
                                    <p>Vezba br. 2</p>
                                    <div className={'diff easy'}>
                                        <p>Easy</p>
                                    </div>
                                    </div>
                                </div>
                                <div className={Styles.linija}>
                                    <p>Vežba:   Električno kolo sa sijalicom</p>
                                    <div className={Styles.desno}>
                                    <p>Vezba br. 5</p>
                                    <div className={'diff medium'}>
                                        <p>Medium</p>
                                    </div>
                                    </div>
                                </div>
                                <div className={Styles.linija}>
                                    <p>Vežba:   Električno kolo sa i bez sijalice</p>
                                    <div className={Styles.desno}>
                                    <p>Vezba br. 7</p>
                                    <div className={'diff hard'}>
                                        <p>Hard</p>
                                    </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className={Styles.done}>
                            <h2>Rezervisane vežbe</h2>
                            <p>-nema rezervacija</p>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default Profile;