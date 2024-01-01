const getSecondPartOfCombinedString = ({
	combinedString,
	knownPart,
}: {
	combinedString: string;
	knownPart: string;
}) => {
	const secondPart = combinedString.replace(knownPart, "");
	return secondPart;
};

export default getSecondPartOfCombinedString;
