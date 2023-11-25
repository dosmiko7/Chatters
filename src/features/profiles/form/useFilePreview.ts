import { useEffect, useState } from "react";

const useFilePreview = (file: FileList | null) => {
	const [imgSrc, setImgSrc] = useState<string | null>("");

	useEffect(() => {
		if (file && file[0]) {
			if (file[0].type === "image/jpeg" || file[0].type === "image/png") {
				const newUrl = URL.createObjectURL(file[0]);
				setImgSrc(newUrl);
			}
		} else setImgSrc(null);
	}, [file]);

	return { imgSrc };
};

export default useFilePreview;
