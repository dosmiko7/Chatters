import { firestore } from "../../firebase";
import {
	QueryDocumentSnapshot,
	Timestamp,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from "firebase/firestore";

import formatDate from "../../utils/formatDate";
import { IDashboardFormInput } from "../../features/dashboard/form/DashboardForm";
import { getUser } from "./userApi";
import { uploadDashboardFile } from "../storage/storageApi";

export const PAGINATION_LIMIT = 7;

export interface IOptionsDashboard {
	order: "desc" | "asc";
	key?: string | null;
}

export interface IPostDataProps {
	postId: string;
	data: {
		userId: string;
		avatar: string;
		nickname: string;
		message: string;
		file?: string;
		type: string;
		createdAt: string;
	};
}

export interface IDashboardDocDataProps {
	userId: string;
	message: string;
	file?: string;
	type: string;
	created_at: Timestamp;
}

interface IGetDashboardPostsProps {
	options: IOptionsDashboard;
	latestDoc: QueryDocumentSnapshot | undefined;
	pagination: number;
}

export const getDashboardPosts = async ({ options, latestDoc, pagination }: IGetDashboardPostsProps) => {
	let baseQuery;
	if (options.order === "desc" && pagination === 1) {
		baseQuery = query(collection(firestore, "dashboard"), orderBy("created_at", "desc"), limit(PAGINATION_LIMIT));
	} else {
		baseQuery = query(
			collection(firestore, "dashboard"),
			orderBy("created_at", options.order),
			startAfter(latestDoc || 0),
			limit(PAGINATION_LIMIT)
		);
	}

	const currentQuery = options.key ? query(baseQuery, where("userId", "==", options.key)) : baseQuery;

	const documentSnapshots = await getDocs(currentQuery);
	const promises = documentSnapshots.docs.map(async (doc) => {
		const docData = doc.data() as IDashboardDocDataProps;
		const userData = await getUser(docData.userId);

		return {
			postId: doc.id,
			data: {
				avatar: userData.data.avatar,
				nickname: userData.data.nickname,
				userId: docData.userId,
				message: docData.message,
				file: docData.file,
				type: docData.type,
				createdAt: formatDate(docData.created_at),
			},
		};
	});

	let currentPosts: IPostDataProps[];
	try {
		currentPosts = await Promise.all(promises);
	} catch {
		throw new Error("getDashboardPosts: Getting current posts failed");
	}

	const lastVisibleDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];

	return { currentPosts, lastVisibleDoc, pagination };
};

export const addDashboardPost = async ({
	input,
	userId,
}: {
	input: IDashboardFormInput;
	userId: string | undefined;
}) => {
	if (userId === undefined) throw new Error("addDashboardPost: UserId should be defined.");

	const { file, type } = await getFileProps({ input });

	const post: IDashboardDocDataProps = {
		userId,
		message: input.message,
		type,
		created_at: Timestamp.fromDate(new Date()),
	};
	if (file) post["file"] = file;

	try {
		await addDoc(collection(firestore, "dashboard"), post);
	} catch {
		throw new Error("addDashboardPost: Adding new doc failed");
	}
};

export const removeDashboardPost = async (postId: string) => {
	const dashboardPostRef = doc(firestore, "dashboard", postId);

	try {
		await deleteDoc(dashboardPostRef);
	} catch {
		throw new Error("removeDashboardPost: Removing of dashboard post failed");
	}
};

const getFileProps = async ({ input }: { input: IDashboardFormInput }) => {
	let file: string | undefined;
	let type: string;
	if (input.file) {
		const fileUrl = await uploadDashboardFile({ file: input.file[0] });
		file = fileUrl;
		type = input.file[0].type;
	} else {
		file = undefined;
		type = "text";
	}

	if (input.gif.length) {
		file = input.gif;
		type = "image/gif";
	}

	return { file, type };
};
