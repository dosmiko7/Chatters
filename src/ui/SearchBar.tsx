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
	border-radius: 50%;
	transition: all 0.3s;

	&:hover {
		font-size: 2rem;
		cursor: pointer;
	}
`;

const StyledInput = styled(Input)`
	background-color: var(--color-primary-300);
	padding: 0 var(--padding-sm);
	width: 100%;

	&:hover {
		background-color: var(--color-primary-300);
	}
`;

interface ISearchBarProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClick: (e: React.FormEvent<HTMLFormElement>) => void;
}

// TODO: Add searching
const SearchBar = ({ onChange, onClick }: ISearchBarProps) => {
	return (
		<StyledSearchBar>
			<SearchIcon onClick={onClick} />
			<StyledInput
				placeholder="Search"
				type="text"
				onChange={onChange}
			/>
		</StyledSearchBar>
	);
};

export default SearchBar;
