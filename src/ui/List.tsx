import { memo } from "react";
import styled, { CSSProperties } from "styled-components";

import { flexColumn } from "../style/Templates";

const StyledList = styled.ul`
	${flexColumn};
	max-width: 100%;

	& > :last-child {
		border-bottom: none;
	}
`;

interface IListProps<T> {
	data: T[];
	render: (item: T, index: number) => JSX.Element;
	style?: CSSProperties;
}

const GenericList = <T,>(props: IListProps<T>) => {
	const { data, render, style } = props;

	return (
		<StyledList
			role="list"
			style={style}
		>
			{data.map(render)}
		</StyledList>
	);
};

const List = memo(GenericList) as typeof GenericList;

export default List;
