import { memo } from "react";
import styled from "styled-components";

import { flexColumn } from "../style/Templates";

const StyledList = styled.ul`
	${flexColumn};
	max-width: 100%;

	& > :last-child {
		border-bottom: none;
	}
`;

interface IListProps<T> extends React.HTMLAttributes<HTMLUListElement> {
	data: T[];
	render: (item: T, index: number) => JSX.Element;
}

const GenericList = <T,>(props: IListProps<T>) => {
	const { data, render, ...rest } = props;

	return (
		<StyledList
			role="list"
			{...rest}
		>
			{data.map(render)}
		</StyledList>
	);
};

const List = memo(GenericList) as typeof GenericList;

export default List;
