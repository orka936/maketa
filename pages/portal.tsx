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
            </div>
        </div>
    );
}

export default Profile;