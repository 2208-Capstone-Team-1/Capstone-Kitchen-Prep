import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "chefs-kiss-d30f4.firebaseapp.com",
  projectId: "chefs-kiss-d30f4",
  storageBucket: "chefs-kiss-d30f4.appspot.com",
  messagingSenderId: "376445935624",
  appId: "1:376445935624:web:1cd185df98d8d51beaf1bd",
  measurementId: "G-3T0TQJQNJH",
});

const auth = firebase.auth() as any;
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const Chat = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>Chat With Alexa</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
};

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const ref = useRef<HTMLDivElement>(null);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(
    query as any
    // not sure if the below is needed and it's causing TS errors
    //     {
    //     idField: "id",
    //   }
  );

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });
    setFormValue("");
    (ref as any).current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={(msg.text, msg.uid)} />
          ))}

        <span ref={ref}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

interface chatProps {
  key: string;
  message: { text: string; uid: string };
}

const ChatMessage: React.FC<chatProps> = (chatProps) => {
  const { text, uid } = chatProps.message;

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
