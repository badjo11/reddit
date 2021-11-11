import React, { useEffect, useReducer } from "react";
//import axios from "axios";
import { auth } from "../firebase/firebase";
import {
  doc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { fireDB } from "../firebase/firebase";

export const authContext = React.createContext();

const INIT_STATE = {
  user: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "FAILED_LOGIN":
      return { ...state, failedLogin: action.payload };
    case "LOGOUT_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const myUser = auth.currentUser;
  console.log(myUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        const uid = user.uid;
        dispatch({
          type: "LOGIN_USER",
          payload: user,
        });
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const createUserWithEmailAndPasswordHandler = async (
    username,
    email,
    gender,
    password
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      generateUserDocument(user, {
        gender,
        username,
        rooms: [],
        roomTitles: [],
      });
    } catch (error) {
      console.log(error);
      //setError("Error Signing up with email and password");
    }
  };

  const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    console.log(user, additionalData);

    const userRef = doc(fireDB, "users", `${user.uid}`);
    const querySnapshot = await getDoc(userRef);
    if (!querySnapshot.exists()) {
      const { email, photoURL } = user;
      try {
        let res = await setDoc(doc(fireDB, "users", `${user.uid}`), {
          email,
          photoURL,
          ...additionalData,
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => {
        //sign out successfully
        dispatch({
          type: "LOGOUT_USER",
          payload: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserDocument = async (uid) => {
    if (!uid) return null;
    try {
      const userDocumentRef = doc(fireDB, "users", `${uid}`);
      const userDocument = await getDoc(userDocumentRef);

      console.log(userDocument._document.data.value.mapValue.fields);
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  const loginUserWithEmail = (email, password) => {
    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  console.log(state.user, "______");

  return (
    <authContext.Provider
      value={{
        createUserWithEmailAndPasswordHandler,
        loginUserWithEmail,
        logOut,
        user: state.user,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
