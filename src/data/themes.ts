interface ThemeData {
	theme: string;
	background: string;
	variables: Record<string, string>;
}

const generateTheme = (theme: string, hexLeftColor: string, hexRightColor: string): ThemeData => {
	const prefix = `--${theme}-chat`;
	const left = `${prefix}-left`;
	const right = `${prefix}-right`;

	const background = `linear-gradient(45deg, var(${left}) 40%, var(${right}) 100%)`;
	const variables = {
		[left]: `${hexLeftColor}`,
		[right]: `${hexRightColor}`,
	};

	return {
		theme,
		background,
		variables,
	};
};

export const themes: ThemeData[] = [
	{
		theme: "default",
		background: "linear-gradient(45deg, var(--default-chat-left) 40%, var(--default-chat-right) 100%)",
		variables: {
			"--default-chat-left": "var(--color-primary-200)",
			"--default-chat-right": "var(--color-secondary-400)",
		},
	},
	generateTheme("grape", "#84afcc", "#402e57"),
	generateTheme("redish", "#5b2c2c", "#881332"),
	generateTheme("violet", "#6E44FF", "#57547B"),
	generateTheme("black", "#000000", "#5A5A5A"),
];
