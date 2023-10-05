import  Styles  from '../styles/profile.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { FirebaseApp } from '../firebase-config';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const Zakazivanje = () => {

    const db = getFirestore(FirebaseApp);//---------------------FIRESTORE

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

    const [value, onChange] = useState<Value>(new Date());

    

    return (
        <div className={Styles.full}>
            <div className={Styles.nav}>
                <h1 className={Styles.naslov}>Vežbe</h1>
                <div className={Styles.navBar}>
                    <Link href="./profile" className={'side'}>pregled</Link>
                    <Link href="./profile" className={'side active'}>zakazivanje</Link>
                    <Link href="./maketa" className={'side'}>probna maketa</Link>
                    <Link href="./portal" className={'side'}>vežbanje</Link>
                </div>
            </div>

            <div className={Styles.right}>
                <div className={Styles.dashboard}>
                    <div className={Styles.basicInfo}>
                        <h2>Zakazivanje</h2>
                    </div>
                    
                    <Image src="/logout.png" width={90} height={90} alt="help" className={Styles.LogOutImg} onClick={signOut}></Image>
                </div>
                <h3 className={Styles.ov}>Odaberite termin</h3>
                <div className={Styles.timePick}>
                    <DateTimePicker onChange={onChange} value={value} />
                </div>
                
                <div className={Styles.timePick}>
                    <button className='button' onClick={() =>{
/*
                        const usersRef = collection(db, "user");
                        try {
                            setDoc(doc(usersRef, `${user?.uid}`), {
                                date: value,
                                id: user.uid 
                            });
                        } catch (e) {
                            addDoc(collection(db, "user"), {
                                date: value,
                                id: user?.uid
                            });
                        }
                            
                            
*/                        
                      
                    }}>zakaži</button>
                </div>
                <div className={Styles.obavestenje}>
                    <p>Moguće je zakazati samo jedan termin!</p>
                    <p>Sledeći termin je moguće zakazati tek nakon što prisustvujete prvom(ili on istekne)</p>
                    <p>U koliko zakažete više termina od jednom, rezervacija će važiti samo za poslednji, ostali će biti izbrisani!</p>
                </div>
                
            </div>
            
        </div>
    );
}

export default Zakazivanje;