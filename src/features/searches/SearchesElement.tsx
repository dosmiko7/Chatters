import styled from "styled-components";
import { BiSolidUserPlus } from "react-icons/bi";

import { ListElement } from "../../ui/ListElement";
import { Button } from "../../ui/Button";
import { Avatar } from "../../ui/Avatar";
import Heading from "../../ui/Heading";

const StyledSearchesElement = styled(ListElement)`
	justify-content: space-between;
`;

const Nickname = styled(Heading)`
	text-align: center;
	padding: 0 2px;
`;

interface ISearchesElementProps {
	avatar: string;
	nickname: string;
}

const SearchesElement = ({ avatar, nickname }: ISearchesElementProps) => {
	return (
		<StyledSearchesElement>
			<Avatar src={avatar} />
			<Nickname as="h3">{nickname}</Nickname>
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
