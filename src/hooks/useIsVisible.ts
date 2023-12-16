import { useState, useEffect } from "react";

const useIsVisible = (ref: React.MutableRefObject<HTMLElement | null>) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		if (ref.current) {
			const observer = new IntersectionObserver((entries) => {
				const entry = entries[0];
				setIsVisible(entry.isIntersecting);
			});

			observer.observe(ref.current);

			return () => {
				observer.disconnect();
			};
		}
	}, [ref]);

	return isVisible;
};

export default useIsVisible;
