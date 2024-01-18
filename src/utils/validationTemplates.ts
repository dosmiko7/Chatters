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
