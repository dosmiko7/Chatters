// Add a second document with a generated ID.
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export const addUser = async (userId: string) => {
	const data = {
		avatar: "gs://chatters---chat-app.appspot.com/avatars/avatar_ivKwYDsLxLkM34cMKDdw.png",
		nickname: "John Doe",
		friends_list: [],
	};

	const userIdRef = doc(firestore, "users", userId);

	return setDoc(userIdRef, data).catch((error) => {
		throw error;
	});
};
