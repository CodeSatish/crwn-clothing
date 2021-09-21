// import firebase from 'firebase/compat/app' ;
// import 'firebase/compat/firestore';
// import 'firebase/compat/auth';
import { computeHeadingLevel } from '@testing-library/react';
import { getAuth,signInWithPopup, GoogleAuthProvider } from '@firebase/auth';
import {doc,getDoc, setDoc, onSnapshot, getFirestore, collection} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';

const config={
    apiKey: "AIzaSyC8eeyQd_L_ObN1IVUVpl_XrBGlNKIjNh8",
    authDomain: "crwn-db111.firebaseapp.com",
    projectId: "crwn-db111",
    storageBucket: "crwn-db111.appspot.com",
    messagingSenderId: "977157335408",
    appId: "1:977157335408:web:a179c4bb2ef704df8c47b5",
    measurementId: "G-M5T5QVV1Z3"
  };

export const createUserProfileDocument = async(userAuth,additionalData) => 
{
  if(!userAuth) return;

  const userRef = doc(firestore,`users/${userAuth.uid}`) ;
  
  const snapShot = await getDoc(userRef);
 
  if(!snapShot.exists())
  {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
   
    try{
        await setDoc(userRef,
         {displayName,
         email,
        createdAt,
         ...additionalData}
      )
    }catch(error){
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

  const firebaseApp= initializeApp(config);

  export const auth= getAuth(firebaseApp);
  
  export const firestore= getFirestore(firebaseApp);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = ()=> signInWithPopup(auth, provider);
//export const signInWithEmail1 =signInWithEmailAndPassword();
  // export default firebase;