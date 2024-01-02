import { Suspense, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useLoggedUser from "../../authentication/useLoggedUser";
import useChatsList, { IChatsListElement } from "./useChatsList";
import useChatsSearch from "../../../context/useChatsSearch";
import useSmallerResolution from "../../../hooks/useSmallerResolution";
import getCombinedId from "../../../utils/getCombinedId";
import { breakpoints } from "../../../style/GlobalStyles";
import ErrorMessage from "../../../ui/ErrorMessage";
import List from "../../../ui/List";
import ChatsListElement from "./ChatsListElement";
import ThreeDots from "../../../ui/ThreeDots";

const StyledChatsList = styled.div`
	height: 100%;
	transform: translateZ(0);
	-webkit-transform: translateZ(0);

	@media only screen and (width <= ${breakpoints.smartphoneScreen}) {
		width: 100%;
		max-width: 100%;
		overflow: scroll;
		padding-bottom: 5px;
	}
`;

const ChatsList = () => {
	const navigate = useNavigate();
	const { chats, error } = useChatsList();
	const { searchValue } = useChatsSearch();
	const { loggedUser } = useLoggedUser();
	const { isSmaller } = useSmallerResolution({ width: 680 });
	const filteredChats = useMemo(
		() =>
			chats
				.filter((chat) => chat.nickname.includes(searchValue))
				.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds),
		[chats, searchValue]
	);

	if (error || !loggedUser) return <ErrorMessage>Something went wrong.</ErrorMessage>;
	return (
		<Suspense fallback={<ThreeDots />}>
			<StyledChatsList>
				<List<IChatsListElement>
					style={isSmaller ? { flexDirection: "row" } : undefined}
					data={filteredChats}
					render={(friend: IChatsListElement) => {
						const combinedId = getCombinedId(loggedUser?.uid, friend.userId);
						return (
							<ChatsListElement
								key={friend.userId}
								onClickHandler={() =>
									navigate(`chat/${combinedId}`, {
										state: {
											nickname: friend.nickname,
											avatar: friend.avatar,
											isActive: friend.isActive,
											friendId: friend.userId,
											userId: loggedUser.uid,
											lastSeen: friend.lastSeen,
										},
									})
								}
								avatar={friend.avatar}
								nickname={friend.nickname}
								isActive={friend.isActive}
								lastMessage={friend.lastMessage}
							/>
						);
					}}
				/>
			</StyledChatsList>
		</Suspense>
	);
};

export default ChatsList;
