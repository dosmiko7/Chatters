import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export const uploadAvatar = async ({ avatarFile, userId }: { avatarFile: File; userId: string }): Promise<void> => {
	const avatarRef = ref(storage, `avatars/avatar_${userId}.png`);
	await uploadBytes(avatarRef, avatarFile, { contentType: avatarFile.type });
};

export const uploadBackground = async ({
	backgroundFile,
	userId,
}: {
	backgroundFile: File;
	userId: string;
}): Promise<void> => {
	const backgroundRef = ref(storage, `backgrounds/background_${userId}.png`);
	await uploadBytes(backgroundRef, backgroundFile, { contentType: backgroundFile.type });
};

export const uploadChatFile = async ({
	chatId,
	fileName,
	chatFile,
}: {
	chatId: string;
	fileName: string;
	chatFile: File;
}): Promise<void> => {
	const chatFileRef = ref(storage, `chatFiles/${chatId}/${fileName}`);
	await uploadBytes(chatFileRef, chatFile, { contentType: chatFile.type });
};

export const getFileURL = async (path: string): Promise<string> => {
	const result = await getDownloadURL(ref(storage, path));
	return result;
};

export const downloadFile = async (filePath: string) => {
	try {
		const url = await getFileURL(filePath);
		const link = document.createElement("a");
		link.href = url;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (err) {
		return err;
	}
};
