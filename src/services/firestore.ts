import { doc, setDoc, getDocs, collection, query, where, or, DocumentData, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { User } from "firebase/auth";

export const addUser = async (user: User) => {
	const defaultData = {
		avatar:
			"https://firebasestorage.googleapis.com/v0/b/chatters---chat-app.appspot.com/o/avatars%2FdefaultAvatar.jpg?alt=media&token=a838b971-c827-4429-bea6-09846aff6b84&_gl=1*nsekzg*_ga*MTM5MTY2MzQwMC4xNjk4ODM0MjE5*_ga_CW55HF8NVT*MTY5OTAzMDA5Ny4xMS4xLjE2OTkwMzA2MDAuNDYuMC4w",
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

export interface IFindUsers {
	id: string;
	data: DocumentData;
}

export const findUsers = async (key: string): Promise<IFindUsers[]> => {
	const q = query(collection(firestore, "users"), or(where("nickname", "==", key), where("email", "==", key)));

	const querySnapshot = await getDocs(q);
	const foundUsers: IFindUsers[] = [];
	querySnapshot.forEach((doc) => {
		foundUsers.push({ id: doc.id, data: doc.data() });
	});
	return foundUsers;
};

export const getUser = async (userId: string | undefined): Promise<DocumentData> => {
	if (userId === undefined) throw new Error("Something went wrong");
	const docRef = doc(firestore, "users", `${userId}`);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		throw new Error("Something went wrong");
	}
};
