import  Styles  from '../styles/profile.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { userAccessToken, fetchUser } from '../utils/fetchUserDetails';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, setDoc, getDocs } from "firebase/firestore";
import { FirebaseApp } from '../firebase-config';


type Value = Date | null;

type User = {
    uid: string
}

const Zakazivanje = () => {

    const db = getFirestore(FirebaseApp);//---------------------FIRESTORE

    const router = useRouter();
    const [user, setUser] = useState<User | undefined>();

    const [zakazan, setZakazan] = useState("-");

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

    const [value, setValue] = useState<Value>(new Date());

    const change = useCallback((newDate: Value) => {
        
        if (newDate == null) return;

        let date = `2023-${(newDate.getMonth()+1 < 10)? '0' + newDate.getMonth()+1 : newDate.getMonth()+1}-${(newDate.getDate() < 10)? '0' + newDate.getDate() : newDate.getDate()}T${(newDate.getHours() < 10)? '0' + newDate.getHours() : newDate.getHours()}:00:00`;
        
        setValue(new Date(date));

    }, []);


    return (
        <div className={Styles.full}>
            <div className={Styles.nav}>
                <h1 className={Styles.naslov}><span className={Styles.podNaslov}>udaljena</span><br />OET<br /><span className={Styles.podNaslov}>laboratorija</span></h1>
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
                    <DateTimePicker minDate={new Date()} maxDate={new Date(Date.now() + 6.048e+8)} onChange={change} value={value} />
                </div>
                
                <div className={Styles.timePick}>
                    <button className='button' onClick={async () =>{

                        const usersRef = collection(db, "user");
                        const documents = await getDocs(usersRef);
                        let found = false;
                        
                        let newDate = "";
                        if(!value) return;


                        newDate = `2023-${(value.getMonth()+1 < 10)? '0' + value.getMonth()+1 : value.getMonth()+1}-${(value.getDate() < 10)? '0' + value.getDate() : value.getDate()}T${(value.getHours() < 10)? '0' + value.getHours() : value.getHours()}:00:00`;


                        documents.forEach((data: any) => {
                            if (data.data().Date == newDate) found = true;
                        })
                        if (!user || found){
                            alert('Termin je zauzet');
                            return;
                        }

                        try {
                            setZakazan('zakazano za ' + (""+(new Date(newDate))).split(':')[0] + "h");
                            await setDoc(doc(usersRef, `${user.uid}`), {
                                Date: newDate,
                                Id: user.uid
                            });
                            
                        } catch (e) {
                            setZakazan('zakazano za ' + (""+(new Date(newDate))).split(':')[0] + "h");
                            await addDoc(collection(db, "user"), {
                                Date: newDate,
                                Id: user.uid
                            });
                            
                        }                 
                      
                        
                        
                    }}>zakaži</button>
                </div>
                <div className={Styles.obavestenje}>
                    <h5 className={Styles.pot}>{zakazan} </h5>
                    <p>Moguće je zakazati samo jedan termin!</p>
                    <p>Sledeći termin je moguće zakazati tek nakon što prisustvujete prvom(ili on istekne)</p>
                    <p>U koliko zakažete više termina od jednom, rezervacija će važiti samo za poslednji, ostali će biti izbrisani!</p>
                </div>
                
            </div>
            
        </div>
    );
}

export default Zakazivanje;