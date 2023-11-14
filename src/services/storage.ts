import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export const uploadAvatar = async ({ avatarFile, userID }: { avatarFile: File; userID: string }): Promise<void> => {
	console.log(avatarFile);
	const avatarRef = ref(storage, `avatars/avatar_${userID}.png`);
	await uploadBytes(avatarRef, avatarFile);
};

export const uploadBackground = async ({
	backgroundFile,
	userID,
}: {
	backgroundFile: File;
	userID: string;
}): Promise<void> => {
	const backgroundRef = ref(storage, `backgrounds/background_${userID}.png`);
	await uploadBytes(backgroundRef, backgroundFile);
};

export const getImageURL = async (path: string): Promise<string> => {
	const result = getDownloadURL(ref(storage, `${path}`));
	return result;
};
