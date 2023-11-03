import { doc, setDoc, getDocs, collection, query, where, or, DocumentData } from "firebase/firestore";
import { firestore } from "../firebase";
import { User } from "firebase/auth";

export const addUser = async (user: User) => {
	const defaultData = {
		avatar: "gs://chatters---chat-app.appspot.com/avatars/avatar_ivKwYDsLxLkM34cMKDdw.png",
		nickname: user.email,
		email: user.email,
		friends_list: [],
	};

	const userIdRef = doc(firestore, "users", user.uid);

	return setDoc(userIdRef, defaultData)
		.then(() => user)
		.catch((error) => {
			throw error;
		});
};

export const findUser = async (key: string) => {
	const q = query(collection(firestore, "users"), or(where("nickname", "==", key), where("email", "==", key)));

	const querySnapshot = await getDocs(q);
	const foundUsers: DocumentData[] = [];
	querySnapshot.forEach((doc) => {
		foundUsers.push(doc.data());
	});
	console.log(foundUsers);
};
