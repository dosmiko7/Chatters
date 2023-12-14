import { useRef } from "react";
import styled from "styled-components";

import useDashboard from "./useDashboard";
import { IOptionsDashboard, IPostDataProps } from "../../services/firestore";
import List from "../../ui/List";
import DashboardListElement from "./DashbaordListElement";
import Spinner from "../../ui/Spinner";

const StyledDashbordList = styled.div`
	max-height: 100vh;
	overflow-y: scroll;
`;

const options: IOptionsDashboard = {
	order: "desc",
	key: "test3",
};

const DashboardList = () => {
	const { posts, getPosts, status, end } = useDashboard();
	const bottomRef = useRef<null | HTMLDivElement>(null);

	return (
		<StyledDashbordList>
			<button onClick={() => getPosts(options)}>Fetch</button>
			<List<IPostDataProps>
				data={posts}
				render={(post: IPostDataProps) => {
					return (
						<DashboardListElement
							key={post.userId + post.createdAt}
							postData={post}
						/>
					);
				}}
			/>
			{!end && <div ref={bottomRef}></div>}
			{status === "pending" && <Spinner />}
		</StyledDashbordList>
	);
};

export default DashboardList;
