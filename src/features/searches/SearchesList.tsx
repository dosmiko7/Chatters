import { useNavigate } from "react-router-dom";
import { IFindUsers } from "../../services/firestore";
import List from "../../ui/List";
import Spinner from "../../ui/Spinner";
import SearchesElement from "./SearchesElement";
import useSearchUsers from "./useSearchUsers";
import { useModal } from "../../ui/Modal";

const SearchesList = ({ query }: { query: string }) => {
	const { data, status } = useSearchUsers(query);
	const navigate = useNavigate();
	const { close } = useModal();

	if (status === "error") return <div>Sorry. Something went wrong.</div>;
	else if (status === "pending") {
		return <Spinner />;
	}

	const handleOnClick = (userId: string) => {
		navigate(`profile/${userId}`);
		close();
	};

	return (
		<List<IFindUsers>
			data={data || []}
			render={(user: IFindUsers) => {
				return (
					<SearchesElement
						key={user.id}
						avatar={user.data.avatar}
						nickname={user.data.nickname}
						onClickHandler={() => handleOnClick(user.id)}
					/>
				);
			}}
		/>
	);
};

export default SearchesList;
