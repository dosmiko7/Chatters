export const formatDate = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
	const formattedDate = date.toLocaleDateString("en-US", options);

	return formattedDate;
};
