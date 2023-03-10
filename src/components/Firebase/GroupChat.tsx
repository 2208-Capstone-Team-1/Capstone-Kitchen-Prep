import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./groupChat.css";

//intialize firebase app
firebase.initializeApp({
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
const firestore = firebase.firestore();

const GroupChat = () => {
  //take user as an object out of the authorized user
  const [user] = useAuthState(auth);
  return (
    <div className="FirebaseApp">
      <header style={{ justifyContent: "center" }}>
        <h1>Group Chat</h1>
      </header>
      {/* if user is signed in, show ChatRoom, otherwise show text */}
      <section>{user ? <ChatRoom /> : <ChatBox />}</section>
    </div>
  );
};

function ChatBox() {
  return <div style={{ color: "white" }}>Login to get chatting!</div>;
}

function ChatRoom() {
  const ref = useRef<HTMLDivElement>(null);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query as any, {
    // @ts-ignore
    idField: "id",
  });

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
    //below code will make chat box scroll to bottom whenever there's a new msg
    (ref as any).current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="groupChat">
      <main className="groupMain">
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} text={msg.text} uid={msg.uid} />
          ))}

        <span ref={ref}></span>
      </main>

      <form className="chatForm" onSubmit={sendMessage}>
        <input
          className="chatInput"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice!"
        />

        <button className="chatButton" type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </div>
  );
}

//define props being passed to ChatMessage
interface chatProps {
  key: number;
  text: string;
  uid: string;
}

//why can I not pull the message out of the chatProps??
const ChatMessage: React.FC<chatProps> = (chatProps) => {
  const uid = chatProps.uid;
  const text = chatProps.text;
  //if the uid equals the current authorized user, show this as sent - otherwise it
  //was sent by another user
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <p className="message_p">{text}</p>
      </div>
    </>
  );
};

export default GroupChat;
