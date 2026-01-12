import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword, 
        signOut} from "firebase/auth";


import { addDoc, 
        collection, 
        getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhuWx2G70V27x5_jxplAd6ie8m94FPaVA",
  authDomain: "netflix-clone-9a8b6.firebaseapp.com",
  projectId: "netflix-clone-9a8b6",
  storageBucket: "netflix-clone-9a8b6.firebasestorage.app",
  messagingSenderId: "513362353311",
  appId: "1:513362353311:web:6c1d00a73deed3944756aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/') [1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  try { await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/') [1].split('-').join(' '));
  }
};

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};
