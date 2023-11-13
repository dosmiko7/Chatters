import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// TODO: Change rules for firestore and storage
// TODO: Change these keys somehow for private
const firebaseConfig = {
	apiKey: "AIzaSyANRqxp9hKPcBlENbxeicY1dynC_8vta2c",
	authDomain: "chatters---chat-app.firebaseapp.com",
	projectId: "chatters---chat-app",
	storageBucket: "chatters---chat-app.appspot.com",
	messagingSenderId: "385913650244",
	appId: "1:385913650244:web:72634101766d5a66485011",
	measurementId: "G-7PZ45VFN9K",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
