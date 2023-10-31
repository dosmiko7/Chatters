import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { Input } from "./Input";

const StyledSearchBar = styled.div`
	position: relative;
	width: 100%;
	margin: 1rem 0;
`;

const SearchIcon = styled(BiSearch)`
	position: absolute;
	right: 5%;
	top: 50%;
	transform: translateY(-50%);
`;

const StyledInput = styled(Input)`
	background-color: var(--color-primary-300);
	padding: 0 var(--padding-sm);
	width: 100%;

	&:hover {
		background-color: var(--color-primary-300);
	}
`;

const SearchBar = () => {
	return (
		<StyledSearchBar>
			<SearchIcon />
			<StyledInput placeholder="Search" />
		</StyledSearchBar>
	);
};

export default SearchBar;
