const getSecondPartOfCombinedString = ({
	combinedString,
	knownPart,
}: {
	combinedString: string;
	knownPart: string;
}) => {
	const index = combinedString.indexOf(knownPart);

	if (index !== -1) {
		const secondPart = combinedString.slice(index + knownPart.length);
		return secondPart;
	} else {
		return "";
	}
};

export default getSecondPartOfCombinedString;
