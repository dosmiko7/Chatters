import styled from "styled-components";
import { useRef } from "react";

import { ListElement } from "../../ui/ListElement";
import { Avatar } from "../../ui/Avatar";
import Heading from "../../ui/Heading";
import useWaveAnimation from "../../hooks/useWaveAnimation";

const StyledSearchesElement = styled(ListElement)`
	position: relative;
	overflow: hidden;

	&:hover {
		background-color: var(--color-primary-300);
	}
`;

const Nickname = styled(Heading)`
	text-align: center;
	margin: 0 auto;
`;
interface ISearchesElementProps {
	avatar: string;
	nickname: string;
	onClickHandler: () => void;
}

const SearchesElement = ({ onClickHandler, avatar, nickname }: ISearchesElementProps) => {
	const elRef = useRef<HTMLLIElement | null>(null);
	const { waves, handleAnimation } = useWaveAnimation(elRef);

	return (
		<StyledSearchesElement
			onMouseDown={handleAnimation}
			onClick={onClickHandler}
			ref={elRef}
		>
			{waves}
			<Avatar
				src={avatar}
				width="4rem"
			/>
			<Nickname as="h3">{nickname}</Nickname>
		</StyledSearchesElement>
	);
};

export default SearchesElement;
