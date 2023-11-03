import styled from "styled-components";
import { flexColumn } from "../style/Templates";

const StyledList = styled.ul`
	${flexColumn};
	max-width: 100%;

	& > :not(:last-child) {
		border-bottom: 1px solid var(--color-primary-200);
	}
`;

interface IListProps<T> {
	data: T[];
	render: (item: T) => any;
}

const List = <T,>(props: IListProps<T>) => {
	const { data, render } = props;

	return <StyledList>{data.map(render)}</StyledList>;
};

export default List;
