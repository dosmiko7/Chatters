import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export const uploadAvatar = async ({ avatarFile, userID }: { avatarFile: File; userID: string }): Promise<void> => {
	console.log(avatarFile);
	const avatarRef = ref(storage, `avatars/avatar_${userID}.jpg`);
	await uploadBytes(avatarRef, avatarFile).then((result) => console.log(result.metadata));
};

export const uploadBackground = async ({
	backgroundFile,
	userID,
}: {
	backgroundFile: File;
	userID: string;
}): Promise<void> => {
	const avatarRef = ref(storage, `backgrounds/background_${userID}.jpg`);
	await uploadBytes(avatarRef, backgroundFile);
};
