import { useMutation } from "@tanstack/react-query";
import { downloadFile } from "../../services/storage";
import { toast } from "react-hot-toast";

const useDownloadFile = () => {
	const { mutate: download, status } = useMutation({
		mutationFn: (filePath: string) => downloadFile(filePath),

		onError: (err) => {
			console.error("FILE DOWNLOAD ERROR ", err);
			toast.error("File download failed");
		},
	});

	return { download, status };
};

export default useDownloadFile;
