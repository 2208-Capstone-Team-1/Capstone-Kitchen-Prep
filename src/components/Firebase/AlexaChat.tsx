import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { onValue, ref, getDatabase } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import "./alexaChat.css";
import axios from "axios";
import { addIngredient } from "../../store/ingredientSlice";

// intialize firebase app
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

interface IngredientInterface {
  name: string;
  image: string;
}

interface chatlogType {
  DATE: string;
  SPEAKER: string;
  TIME: string;
  VALUE: string;
}

// interface ChildComponentProps {
//   items: chatlogType[];
// }

interface ChildComponentProps {
  [key: string]: any;
}

const AlexaChat = () => {
  /** customs hooks */
  const dispatch = useDispatch();

  // const [chatlogs, setChatlogs] = useState<chatlogType[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const { chatlogs } = useSelector((state: RootState) => state.chatlog);

  useEffect(() => {}, [chatlogs]);

  return (
    <div className="FirebaseApp">
      <header style={{ justifyContent: "center" }}>
        <h1>Chat With Alexa</h1>
      </header>
      <main className="alexaMain">
        <div>
          {chatlogs?.map((input: any, index: any) => {
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
