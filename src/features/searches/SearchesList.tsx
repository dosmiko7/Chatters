import { useNavigate } from "react-router-dom";

import { IDocumentData } from "../../services/firestore";
import List from "../../ui/List";
import Spinner from "../../ui/Spinner";
import SearchesElement from "./SearchesElement";
import useSearchUsers from "./useSearchUsers";
import { useModal } from "../../hooks/useModal";
import Heading from "../../ui/Heading";

const SearchesList = ({ query }: { query: string }) => {
	const { data, status } = useSearchUsers(query);
	const navigate = useNavigate();
	const { close } = useModal();

	if (status === "error") return <Heading as="h3">Sorry. Something went wrong.</Heading>;
	else if (status === "pending") {
		return <Spinner />;
	}

	const handleOnClick = (userId: string) => {
		navigate(`profile/${userId}`);
		close();
	};

	if (data?.length === 0) return <Heading as="h3">There is no such user.</Heading>;

	return (
		<List<IDocumentData>
			data={data || []}
			render={(user: IDocumentData) => {
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
