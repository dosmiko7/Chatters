import { useEffect, useState } from "react";

// TODO: Add thumbnail for videos
// TODO: The inscription is crooked
const useFilePreview = (file: FileList | null) => {
	const [imgSrc, setImgSrc] = useState<string | null>("");

	useEffect(() => {
		if (file && file[0]) {
			if (file[0].type.includes("image")) {
				const newUrl = URL.createObjectURL(file[0]);
				setImgSrc(newUrl);
			}
		} else setImgSrc(null);
	}, [file]);

	return { imgSrc };
};

export default useFilePreview;
