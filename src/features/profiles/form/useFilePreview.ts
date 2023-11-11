import { useEffect, useState } from "react";

const useFilePreview = (file: File[]) => {
	const [imgSrc, setImgSrc] = useState<string>("");

	useEffect(() => {
		if (file && file[0]) {
			const newUrl = URL.createObjectURL(file[0]);
			setImgSrc(newUrl);
		}
	}, [file]);

	return { imgSrc };
};

export default useFilePreview;
