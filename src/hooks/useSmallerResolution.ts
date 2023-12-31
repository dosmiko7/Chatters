import { useState, useEffect } from "react";

const useSmallerResolution = ({ width }: { width: number }) => {
	const [isSmaller, setIsSmaller] = useState(() => {
		const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
		return mediaQuery.matches;
	});

	useEffect(() => {
		const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);

		const handleWidthChange = (e: MediaQueryListEvent) => {
			setIsSmaller(e.matches);
		};

		mediaQuery.addEventListener("change", handleWidthChange);

		return () => {
			mediaQuery.removeEventListener("change", handleWidthChange);
		};
	}, [width]);

	return { isSmaller };
};

export default useSmallerResolution;
