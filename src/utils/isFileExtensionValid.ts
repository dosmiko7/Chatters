const isFileExtensionValid = (fileName: string, allowedExtensions: string[]) => {
	const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
	return allowedExtensions.includes(fileExtension.toLowerCase());
};

export default isFileExtensionValid;
