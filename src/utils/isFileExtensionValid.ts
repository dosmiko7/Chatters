const isFileExtensionValid = (fileName: string, allowedExtensions: string[]) => {
	if (allowedExtensions.length === 0) return true;

	const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
	return allowedExtensions.includes(fileExtension.toLowerCase());
};

export default isFileExtensionValid;
