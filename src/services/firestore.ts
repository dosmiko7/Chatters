// Add a second document with a generated ID.
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { User } from "firebase/auth";

export const addUser = async (user: User) => {
	const data = {
		avatar: "gs://chatters---chat-app.appspot.com/avatars/avatar_ivKwYDsLxLkM34cMKDdw.png",
		nickname: user.email,
		friends_list: [],
	};

	const userIdRef = doc(firestore, "users", user.uid);

	return setDoc(userIdRef, data)
		.then(() => user)
		.catch((error) => {
			throw error;
		});
};
