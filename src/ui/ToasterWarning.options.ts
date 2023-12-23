export const toasterWarningOptions = ({ id }: { id: string }) => {
	return {
		duration: 14000,
		id,
		style: {
			backgroundColor: "var(--color-primary-400)",
			boxShadow: "var(--shadow-sm)",
			maxWidth: "300px",
		},
	};
};
