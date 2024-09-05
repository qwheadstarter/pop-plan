import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyApO2pJJWHMGJeKy_rvSny-KjWjomz90Qs",
    authDomain: "pop-plan.firebaseapp.com",
    projectId: "pop-plan",
    storageBucket: "pop-plan.appspot.com",
    messagingSenderId: "151439073977",
    appId: "1:151439073977:web:35d456a0a345c3b5c5f168",
    measurementId: "G-1F18KW2V7D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
