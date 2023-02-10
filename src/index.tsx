import App from "./components/App";
import store from "./store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

/* //!commented out maybe use for firebase later?
// src/index.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";

const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "chefs-kiss-d30f4.firebaseapp.com",
  projectId: "chefs-kiss-d30f4",
  storageBucket: "chefs-kiss-d30f4.appspot.com",
  messagingSenderId: "376445935624",
  appId: "1:376445935624:web:1cd185df98d8d51beaf1bd",
  measurementId: "G-3T0TQJQNJH",
});
const db = getFirestore(firebaseApp);

// async function loadCity(name) {
//   const cityDoc = doc(db, `cities/${name}`);
//   const snapshot = await getDoc(cityDoc);
//   return {
//     id: snapshot.id,
//     ...snapshot.data(),
//   };
// }
*/
const container = document.querySelector("#root")!;
//exclamation point at the end guarantees that the above line will always be defined
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
