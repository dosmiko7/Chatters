import { Timestamp } from "firebase/firestore";

export const formatDate = (timestamp: Timestamp) => {
	const date = timestamp.toDate();
	const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
	const formattedDate = date.toLocaleDateString("en-US", options);

	return formattedDate;
};
