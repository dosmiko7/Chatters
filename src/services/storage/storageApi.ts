import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

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

export const uploadDashboardFile = async ({ file }: { file: File }) => {
	const dashboardFileRef = ref(storage, `dashboard/${file.name}`);
	const uploadResult = await uploadBytes(dashboardFileRef, file, { contentType: file.type });
	const path = uploadResult.metadata.fullPath;
	const result = getFileURL(path);
	return result;
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
	} catch {
		throw new Error("downloadFile: File download failed");
	}
};

export const removeStorageFolder = async ({ path }: { path: string }) => {
	const folderRef = ref(storage, path);

	try {
		const res = await listAll(folderRef);
		await Promise.all(res.items.map((fileRef) => deleteObject(fileRef)));
	} catch {
		throw new Error("removeStorageFolder: removing storage folder failed");
	}
};

export const removeStorageFile = async ({ path }: { path: string }) => {
	const fileRef = ref(storage, path);

	try {
		await deleteObject(fileRef);
	} catch {
		throw new Error("removeStorageFile: removing storage file failed");
	}
};
