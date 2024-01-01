const overwriteProperties = (input: any, data: any): any => {
	const copy = { ...data };

	for (const prop in copy) {
		if (Object.prototype.hasOwnProperty.call(data, prop) && Object.prototype.hasOwnProperty.call(input, prop)) {
			if (typeof copy[prop] === "object") {
				copy[prop] = { ...copy[prop], ...input[prop] };
			} else copy[prop] = input[prop];
		}
	}

	return copy;
};

const removeEmptyProperties = (input: any): any => {
	const copy = { ...input };

	for (const prop in copy) {
		if (copy[prop] === null || copy[prop] === undefined || copy[prop] === "") {
			delete copy[prop];
		} else if (typeof copy[prop] === "object" && copy[prop] !== null && !(copy[prop] instanceof FileList)) {
			copy[prop] = removeEmptyProperties(copy[prop]);
			if (Object.keys(copy[prop]).length === 0) {
				delete copy[prop];
			}
		}
	}
	return copy;
};

const formatSubmit = (input: any, data: any) => {
	const inputWithoutEmpties = removeEmptyProperties(input);
	const formattedInput = overwriteProperties(inputWithoutEmpties, data);

	return formattedInput;
};

export default formatSubmit;
