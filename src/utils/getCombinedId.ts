const getCombinedId = (firstId: string, secondId: string) => {
	const combinedId = firstId > secondId ? `${firstId}${secondId}` : `${secondId}${firstId}`;

	return combinedId;
};

export default getCombinedId;
