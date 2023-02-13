import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./chat.css";

firebase.initializeApp({
  apiKey: "AIzaSyACYBhS0y2OHMoflq0g0TRdQiiArnfrrY",
  authDomain: "chefs-kiss-d30f4.firebaseapp.com",
  projectId: "chefs-kiss-d30f4",
  storageBucket: "chefs-kiss-d30f4.appspot.com",
  messagingSenderId: "376445935624",
  appId: "1:376445935624:web:1cd185df98d8d51beaf1bd",
  measurementId: "G-3T0TQJQNJH",
});

const auth = firebase.auth() as any;
const firestore = firebase.firestore();

const Chat = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>Chat With Alexa</h1>
      </header>
      {/* if user is signed in, show ChatRoom, otherwise show text */}
      <section>{user ? <ChatRoom /> : <ChatBox />}</section>
    </div>
  );
};

function ChatBox() {
  return <>Chat Box Here</>;
}

function ChatRoom() {
  const ref = useRef<HTMLDivElement>(null);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query as any, {
    // @ts-ignore
    idField: "id",
  });

  console.log("MESSAGES: ", messages);

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const { uid } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });
    setFormValue("");
    //below code will make chat box scroll to bottom
    (ref as any).current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} text={msg.text} uid={msg.uid} />
          ))}

        <span ref={ref}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="start talking to Alexa"
        />

        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

interface chatProps {
  key: number;
  text: string;
  uid: string;
}

//why can I not pull the message out of the chatProps??
const ChatMessage: React.FC<chatProps> = (chatProps) => {
  console.log("MESSAGE: ", chatProps.text);
  const uid = chatProps.uid;
  const text = chatProps.text;
  console.log("CURRENT USER: ", auth.currentUser.uid);
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    </>
  );
};

export default Chat;
