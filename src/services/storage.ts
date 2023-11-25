import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const METADATA = {
	contentType: "image/png",
};

export const uploadAvatar = async ({ avatarFile, userId }: { avatarFile: File; userId: string }): Promise<void> => {
	const avatarRef = ref(storage, `avatars/avatar_${userId}.png`);
	await uploadBytes(avatarRef, avatarFile, METADATA);
};

export const uploadBackground = async ({
	backgroundFile,
	userId,
}: {
	backgroundFile: File;
	userId: string;
}): Promise<void> => {
	const backgroundRef = ref(storage, `backgrounds/background_${userId}.png`);
	await uploadBytes(backgroundRef, backgroundFile, METADATA);
};

export const uploadChatFile = async ({
	chatId,
	fileName,
	chatFile,
}: {
	chatId: string;
	fileName: string;
	chatFile: File;
}) => {
	const chatFileRef = ref(storage, `chatFiles/${chatId}/${fileName}`);
	await uploadBytes(chatFileRef, chatFile);
};

export const getImageURL = async (path: string): Promise<string> => {
	const result = getDownloadURL(ref(storage, path));
	return result;
};
