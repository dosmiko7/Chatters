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
	transition: var(--transition-all-3);

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
	placeholder?: string;
	onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onIconClickHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
}

// TODO: Add searching
const SearchBar = ({ placeholder = "Search", onChangeHandler, onIconClickHandler }: ISearchBarProps) => {
	return (
		<StyledSearchBar>
			<SearchIcon onClick={onIconClickHandler} />
			<StyledInput
				placeholder={placeholder}
				type="text"
				onChange={onChangeHandler}
			/>
		</StyledSearchBar>
	);
};

export default SearchBar;
