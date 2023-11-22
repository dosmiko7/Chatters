import styled from "styled-components";
import { flexColumn } from "../style/Templates";

const StyledList = styled.ul`
	${flexColumn};
	max-width: 100%;

	& > :not(:last-child) {
		border-bottom: var(--border-thin);
	}
`;

interface IListProps<T> {
	data: T[];
	render: (item: T, index: number) => JSX.Element;
}

const List = <T,>(props: IListProps<T>) => {
	const { data, render } = props;

	return <StyledList>{data.map(render)}</StyledList>;
};

export default List;
