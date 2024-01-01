import styled from "styled-components";

import { flexRow } from "../style/Templates";
import Heading from "./Heading";

const Container = styled.div``;

const Category = styled(Heading).attrs({ as: "h3" })`
	margin: 1rem 0;
	font-weight: var(--font-weight-bold);
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Option = styled.li`
	${flexRow}
	align-items: center;
	gap: 0.4rem;
	border-radius: var(--border-radius-md);

	&:hover {
		backdrop-filter: contrast(90%);
	}
`;

const Options = {
	Container,
	Category,
	List,
	Option,
};

export default Options;
