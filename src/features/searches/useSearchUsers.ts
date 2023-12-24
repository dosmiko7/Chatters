import { useQuery } from "@tanstack/react-query";

import { findUsers } from "../../services/firestore";

const useSearchUsers = (query: string) => {
	const { data, status } = useQuery({
		queryKey: ["foundUsers", query],
		queryFn: () => findUsers(query),
		retry: false,
	});
	return { data, status };
};

export default useSearchUsers;
