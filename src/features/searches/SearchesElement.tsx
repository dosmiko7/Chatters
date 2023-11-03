import styled from "styled-components";
import { BiSolidUserPlus } from "react-icons/bi";

import { ListElement } from "../../ui/ListElement";
import { Button } from "../../ui/Button";
import { Avatar } from "../../ui/Avatar";
import Heading from "../../ui/Heading";

const StyledSearchesElement = styled(ListElement)`
	justify-content: space-between;
`;

interface ISearchesElementProps {
	avatar: string;
	nickname: string;
}

const SearchesElement = ({ avatar, nickname }: ISearchesElementProps) => {
	return (
		<StyledSearchesElement>
			<Avatar src={avatar} />
			<Heading as="h3">{nickname}</Heading>
			<Button
				variant="menu"
				size="large"
			>
				<BiSolidUserPlus />
			</Button>
		</StyledSearchesElement>
	);
};

export default SearchesElement;
