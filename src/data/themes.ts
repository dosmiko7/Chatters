interface ThemeData {
	theme: string;
	background: string;
	variables: Record<string, string>;
	fontColor: string;
}

export const generateTheme = (
	theme: string,
	hexLeftColor: string,
	hexRightColor: string,
	hexFontColor: string
): ThemeData => {
	const prefix = `--${theme}-chat`;
	const left = `${prefix}-left`;
	const right = `${prefix}-right`;

	const background = `linear-gradient(45deg, var(${left}) 40%, var(${right}) 100%)`;
	const variables = {
		[left]: `${hexLeftColor}`,
		[right]: `${hexRightColor}`,
	};
	const fontColor = hexFontColor;

	return {
		theme,
		background,
		variables,
		fontColor,
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
		fontColor: "#fff",
	},
	generateTheme("grape", "#84afcc", "#402e57", "#fff"),
	generateTheme("redish", "#5b2c2c", "#881332", "#fff"),
	generateTheme("violet", "#6E44FF", "#57547B", "#fff"),
	generateTheme("black", "#000000", "#5A5A5A", "#fff"),
];
