import { useWatch } from "react-hook-form";

import GIFInput from "../../common/GIFInput";

const DashboardFormGIF = () => {
	const fileWatcher = useWatch({ name: "file" });

	if (fileWatcher) return null;

	return <GIFInput isSubmit={false} />;
};

export default DashboardFormGIF;
