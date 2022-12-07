import {initializeApp} from "firebase/app";
import serviceAccount from './serviceAccountKey.json';
import { getDatabase } from "firebase/database";

const app = initializeApp(serviceAccount);
const database = getDatabase(app);

export default database;