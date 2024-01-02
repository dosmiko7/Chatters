import styled from "styled-components";

import { breakpoints } from "../../../style/GlobalStyles";
import { flexColumn } from "../../../style/Templates";
import Avatar from "../../../ui/Avatar";
import Heading from "../../../ui/Heading";
import useSmallerResolution from "../../../hooks/useSmallerResolution";

const Info = styled.div`
	${flexColumn}
	align-items: center;
	gap: 0.4rem;

	@media only screen and (width <= ${breakpoints.smallTabletScreen}) {
		h3 {
			font-size: 2rem;
		}

		time {
			font-size: 1.8rem;
		}
	}
`;

const ChatMoreInfo = ({
	infoData,
}: {
	infoData: { avatar: string; nickname: string; isActive: boolean; lastSeen: string };
}) => {
	const { avatar, nickname, isActive, lastSeen } = infoData;
	const { isSmaller } = useSmallerResolution({ width: 860 });

	const activeStatus = isActive ? "🟢 Active now" : `🔴 Last seen ${lastSeen}`;

	return (
		<Info>
			<Avatar
				size={isSmaller ? "12rem" : "6rem"}
				src={avatar}
			/>
			<Heading as="h3">{nickname}</Heading>
			<Heading
				as="time"
				center
			>
				{activeStatus}
			</Heading>
		</Info>
	);
};

export default ChatMoreInfo;
