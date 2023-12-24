import { createContext, useState, ReactNode } from "react";

import { IOptionsDashboard } from "../services/firestore/dashboardApi";

interface DashboardOptionsContextProps {
	options: IOptionsDashboard;
	setOrder: (order: "desc" | "asc") => void;
	setKey: (key: string | null) => void;
}

const defaultValues: DashboardOptionsContextProps = {
	options: { order: "desc" },
	setOrder: () => {},
	setKey: () => {},
};

export const DashboardOptionsContext = createContext(defaultValues);

const DashboardOptionsProvider = ({ children }: { children: ReactNode }) => {
	const [options, setOptions] = useState<IOptionsDashboard>({ order: "desc" });

	const setOrder = (order: "desc" | "asc") => {
		setOptions((prev) => ({
			...prev,
			order,
		}));
	};

	const setKey = (key: string | null) => {
		setOptions((prev) => ({
			...prev,
			key,
		}));
	};

	return (
		<DashboardOptionsContext.Provider value={{ options, setOrder, setKey }}>
			{children}
		</DashboardOptionsContext.Provider>
	);
};

export default DashboardOptionsProvider;
