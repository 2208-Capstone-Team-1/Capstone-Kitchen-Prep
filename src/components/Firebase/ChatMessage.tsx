import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const auth = firebase.auth() as any;

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

export default ChatMessage;
