import  Styles  from '../styles/profile.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { FirebaseApp } from '../firebase-config';


type User = {
    uid: string
}


const Profile = () => {

    const db = getFirestore(FirebaseApp);//---------------------FIRESTORE

    const router = useRouter();
    const [user, setUser] = useState<User | undefined>();

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

    const checkReservation = async (vezba: string) => {

        const usersRef = await collection(db, "user");
        const documents = await getDocs(usersRef);
        let pom = false;


        if(!user) return;

        documents.forEach((data: any) => {

            let terminDo = new Date(data.data().Date);
            terminDo.setHours(terminDo.getHours() + 1);

            if (data.data().Id === user.uid && new Date(Date.now()) > new Date(data.data().Date) && new Date(Date.now()) < terminDo){
                pom = true;
                router.push(vezba);
                return;
            }
            
        });
        if(!pom){
            alert('Trenutno nije vaš termin!');
        }
        
    }
    

    return (
        <div className={Styles.full}>
            <div className={Styles.nav}>
                <h1 className={Styles.naslov}><span className={Styles.podNaslov}>udaljena</span><br />OET<br /><span className={Styles.podNaslov}>laboratorija</span></h1>
                <div className={Styles.navBar}>
                    <Link href="./profile" className={'side'}>pregled</Link>
                    <Link href="./zakazivanje" className={'side'}>zakazivanje</Link>
                    <Link href="./maketa" className={'side'}>probna maketa</Link>
                    <Link href="./portal" className={'side active'}>vežbanje</Link>
                </div>
            </div>

            <div className={Styles.right}>
                <div className={Styles.dashboard}>
                    <div className={Styles.basicInfo}>
                    </div>
                    
                    <Image src="/logout.png" width={90} height={90} alt="help" className={Styles.LogOutImg} onClick={signOut}></Image>
                </div>
                <h3 className={Styles.ov}>U koliko vaš termin uskoro počinje, sačekajte na ovoj stranici!</h3>
                <h3 className={Styles.ov2}>U koliko niste rezervisali termin, to možete učiniti klikom <Link href="./zakazivanje" className={Styles.ov2Link}>ovde</Link> </h3>

                <div className={Styles.main}>
                    <p className={Styles.select}>U kolko je sada vaš termin, odaberite vežbu:</p>
                    <p  className={Styles.ov3}>(Vežba 2 nije dostupna,  već je samo tu radi prikaza dizajna, kako ce sajt izgledati sa više vežbi)</p>
                    <div className={Styles.vezbe}>
                        <div className={Styles.vezba} onClick={()=>{
                            checkReservation('/maketa1');
                        }}>
                            <div>
                                <h1>Vežba: 01</h1>
                                <p>Elektricno kolo sa dva kondenzatora</p>
                            </div>
                            <Image src="/kondenzator2.png" width={524} height={505} className={Styles.slikaMakete} alt='maketa'></Image>
                        </div>
                        <div className={Styles.vezba}>
                            <div>
                                <h1>Vežba: 02</h1>
                                <p>Elektricno kolo bez sijalice i sa dva otpornika</p>
                            </div>
                            <Image src="/maketa2.jpg" width={524} height={505} className={Styles.slikaMakete} alt='maketa'></Image>
                        </div>
                        <div className={Styles.vezba} onClick={()=>{
                            checkReservation('/maketa5');
                        }}>
                            <div>
                                <h1>Vežba: 05</h1>
                                <p>Elektricno kolo sa sijalicom i sa (ili bez) otpornika R1</p>
                            </div>
                            <Image src="/maketa5.png" width={524} height={505} className={Styles.slikaMakete} alt='maketa'></Image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;