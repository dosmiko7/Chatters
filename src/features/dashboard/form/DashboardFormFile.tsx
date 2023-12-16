import { useWatch } from "react-hook-form";

import FileInput from "../../common/FileInput";

const DashboardFormFile = () => {
	const gifWatcher = useWatch({ name: "gif" });

	if (gifWatcher) return null;

	return <FileInput />;
};

export default DashboardFormFile;
