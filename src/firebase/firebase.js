import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//import { functions } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBhSibM49TeTDaize3E8UbojvSvzCNVvDo",
  authDomain: "myreddit-ac700.firebaseapp.com",
  projectId: "myreddit-ac700",
  storageBucket: "myreddit-ac700.appspot.com",
  messagingSenderId: "726284597668",
  appId: "1:726284597668:web:eba3c6d9d233d57daf2931",
  measurementId: "G-2Q7GD90B0C",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const fireDB = getFirestore(app);
// export const firestore = getFirestore.firestore();
