import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { onValue, ref, getDatabase } from "firebase/database";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./alexaChat.css";

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

const database = getDatabase(app);
//defining what the chatlog type will be
interface chatlogType {
  DATE: string;
  SPEAKER: string;
  TIME: string;
  VALUE: string;
}

const AlexaChat = () => {
  const [chatlogs, setChatlogs] = useState<chatlogType[]>([]);
  const { user } = useSelector((state: RootState) => state.user);

  const getChatlog = () => {
    const query = ref(database, "Alexa/" + user.phoneNumber);
    return onValue(query, (snapshot) => {
      //snapshot.val() takes a snapshot of the firebase database and stores in the alexaData variable
      const alexaData = snapshot.val();
      //initiate empty array
      let alexaDataArr = [];
      // push the values in the object into an array because it needs to be iterable
      if (snapshot.exists()) {
        for (const alexaInput in alexaData) {
          alexaDataArr.push(alexaData[alexaInput]);
        }
        setChatlogs(alexaDataArr);
        // take last value in the array
        // check if the key: TYPE exists
        // if yes, we'll take the SPEAKER and call the api to add to the database
        // dispatch new ingredients
      }
      console.log("alexaDataArr ", alexaDataArr);
    });
  };

  useEffect(() => {
    getChatlog();
  }, []);

  return (
    <div className="FirebaseApp">
      <header style={{ justifyContent: "center" }}>
        <h1>Chat With Alexa</h1>
      </header>
      <main className="alexaMain">
        <div>
          {chatlogs.map((input, index) => {
            return (
              <div key={index} className="messages">
                <div className="message sent">
                  <p className="message_p">{input.SPEAKER}</p>
                </div>
                <div className="message received">
                  <p className="message_p">{input.VALUE}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AlexaChat;
