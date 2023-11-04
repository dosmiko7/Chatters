import { IFindUsers } from "../../services/firestore";
import List from "../../ui/List";
import Spinner from "../../ui/Spinner";
import SearchesElement from "./SearchesElement";
import useSearchUsers from "./useSearchUsers";

const SearchesList = ({ query }: { query: string }) => {
	const { data, status } = useSearchUsers(query);

	if (status === "error") return <div>Sorry. Something went wrong.</div>;
	else if (status === "pending") {
		return <Spinner />;
	}

	return (
		<List<IFindUsers>
			data={data || []}
			render={(user: IFindUsers) => {
				return (
					<SearchesElement
						key={user.id}
						avatar={user.data.avatar}
						nickname={user.data.nickname}
					/>
				);
			}}
		/>
	);
};

export default SearchesList;
