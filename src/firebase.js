// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: "AIzaSyANRqxp9hKPcBlENbxeicY1dynC_8vta2c",
	authDomain: "chatters---chat-app.firebaseapp.com",
	projectId: "chatters---chat-app",
	storageBucket: "chatters---chat-app.appspot.com",
	messagingSenderId: "385913650244",
	appId: "1:385913650244:web:72634101766d5a66485011",
	measurementId: "G-7PZ45VFN9K",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
