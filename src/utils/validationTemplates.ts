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
