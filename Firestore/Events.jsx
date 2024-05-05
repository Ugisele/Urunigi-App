import { doc,addDoc,getDoc,deleteDoc,collection } from "firebase/firestore";
import { DB } from "../FirebaseConfig";

export const WriteDays = async (Day,category) => {

        try {
            const Days= await addDoc(collection(DB, 'Days'), {
                    Day: Day,       
            })
            console.log('Days picked', Days);  
        } catch (error) {
            console.log(error);    
        }
    }
