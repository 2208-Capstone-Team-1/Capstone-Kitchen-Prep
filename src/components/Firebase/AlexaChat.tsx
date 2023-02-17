import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { onValue, ref, getDatabase } from "firebase/database";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

//intialize firebase app
const app = firebase.initializeApp({
  apiKey: "AIzaSyACYBhS0y2OHMoflq0g0TRdQiiArnfrrYE",
  authDomain: "chefs-kiss-d30f4.firebaseapp.com",
  projectId: "chefs-kiss-d30f4",
  storageBucket: "chefs-kiss-d30f4.appspot.com",
  messagingSenderId: "376445935624",
  appId: "1:376445935624:web:1cd185df98d8d51beaf1bd",
  measurementId: "G-3T0TQJQNJH",
  database: "https://chefs-kiss-d30f4-default-rtdb.firebaseio.com",
});

//define authorization for firebase
const auth = firebase.auth() as any;
const database = getDatabase(app);

const AlexaChat = () => {
  const [chatlogs, setChatlogs] = useState({});
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const query = ref(database, "Alexa/" + user.id);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      //   if (snapshot.exists()) {
      //     Object.values(
      //       data.map((chatlog: any) => {
      //         setChatlogs((chatlogs) => [...chatlogs, chatlog]);
      //       })
      //     );
      //   }
    });
  }, []);
  return <div></div>;
};

export default AlexaChat;
