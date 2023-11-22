import { Timestamp } from "firebase/firestore";

const formatDate = (timestamp: Timestamp) => {
	const date = timestamp.toDate();
	const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
	const formattedDate = date.toLocaleDateString("en-US", options);

	return formattedDate;
};

export default formatDate;
