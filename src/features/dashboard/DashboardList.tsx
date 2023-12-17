import { useEffect, useRef } from "react";
import styled from "styled-components";

import useIsVisible from "../../hooks/useIsVisible";
import { IPostDataProps } from "../../services/firestore";
import List from "../../ui/List";
import DashboardListElement from "./DashbaordListElement";
import Spinner from "../../ui/Spinner";
import Paragraph from "../../ui/Paragraph";
import useDashboard from "./useDashboard";

const StyledDashbordList = styled.div`
	height: 100%;
	width: 100%;
`;

const DashboardList = () => {
	const bottomRef = useRef<HTMLDivElement>(null);
	const isVisible = useIsVisible(bottomRef);
	const { posts, fetchNextPage, hasNextPage, status } = useDashboard();

	useEffect(() => {
		if (isVisible && status !== "fetching" && hasNextPage) {
			fetchNextPage();
		}
	}, [isVisible, fetchNextPage, status, hasNextPage]);

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
			<div ref={bottomRef}></div>
			{status === "fetching" && <Spinner />}
		</StyledDashbordList>
	);
};

export default DashboardList;
