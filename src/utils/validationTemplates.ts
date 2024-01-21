import isFileExtensionValid from "./isFileExtensionValid";

export const emailValidation = {
	required: "Email is required",
	pattern: {
		value: /^\S+@\S+\.\S+$/,
		message: "Invalid email address",
	},
};

export const passwordRegisterValidation = {
	required: "Password is required",
	pattern: {
		value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};:'"<>,.?~\\-])\S*$/,
		message: "Password must contain at least one uppercase letter and one special character",
	},
};

export const passwordLoginValidation = {
	required: "Password is required",
};

export const linkValidation = {
	pattern: {
		value: /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/\S*)?$/i,
		message: "Invalid URL format",
	},
};

export const nameValidation = {
	pattern: { value: /^[a-zA-Z]+$/, message: "Only letters" },
	minLength: { value: 2, message: "At least 2 character" },
	maxLength: { value: 20, message: "No more than 20 characters" },
};

export const cityValidation = {
	pattern: { value: /^[a-zA-ZżźćńłąęśóäöüßæøåÆØÅ\s]+$/, message: "Only letters" },
	minLength: { value: 2, message: "At least 2 character" },
	maxLength: { value: 100, message: "No more than 100 characters" },
};

export const nicknameValidation = {
	pattern: { value: /^[a-zA-ZżźćńłąęśóäöüßæøåÆØÅ\d\s]+$/, message: "Special characters are not allowed" },
	minLength: { value: 5, message: "At least 5 characters" },
	maxLength: { value: 20, message: "No more than 20 characters" },
};

export const dateValidation = {
	valueAsDate: true,
	validate: (date: Date) => {
		return date <= new Date() || "The date should not be newer than today";
	},
};

export const fileValidation = (value: FileList | null, allowedExtensions: string[] = []) => {
	if (value?.length) {
		const file = value[0];
		const maxSizeInBytes = 1024 * 1024;

		if (!isFileExtensionValid(file.name, allowedExtensions)) {
			return `Only ${allowedExtensions.join(", ")} are allowed`;
		}

		if (file.size > maxSizeInBytes) {
			return "File size should be less than 1 MB";
		}
	}

	return true;
};

export const descriptionValidation = {
	maxLength: { value: 700, message: "No more than 700 characters" },
};
