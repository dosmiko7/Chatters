import { useEffect, useRef } from "react";
import styled from "styled-components";

import useDashboard from "./useDashboard";
import { IOptionsDashboard, IPostDataProps } from "../../services/firestore";
import List from "../../ui/List";
import DashboardListElement from "./DashbaordListElement";
import Spinner from "../../ui/Spinner";
import useIsVisible from "../../hooks/useIsVisible";
import Paragraph from "../../ui/Paragraph";

const StyledDashbordList = styled.div`
	height: 100%;
	max-width: 60%;
	padding: 0 4rem;
`;

const options: IOptionsDashboard = {
	order: "desc",
	key: "test3",
};

const DashboardList = () => {
	const { posts, getPosts, status, end } = useDashboard();
	const bottomRef = useRef<null | HTMLDivElement>(null);
	const isVisible = useIsVisible(bottomRef);

	useEffect(() => {
		if (isVisible) {
			getPosts(options);
		}
	}, [getPosts, isVisible]);

	return (
		<StyledDashbordList>
			{!posts.length && <Paragraph>There are no posts yet</Paragraph>}
			<List<IPostDataProps>
				data={posts}
				render={(post: IPostDataProps, index: number) => {
					return (
						<DashboardListElement
							key={index}
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
