import { useContext } from "react";

import { DashboardOptionsContext } from "./DashboardOptionsContext";

export const useDashboardOptions = () => {
	const context = useContext(DashboardOptionsContext);
	if (context === undefined) {
		throw new Error("DashboardOptionsContext was used outside of DashboardOptionsProvider");
	}

	return context;
};

export default useDashboardOptions;
