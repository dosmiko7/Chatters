import { IFriend, getUser } from "../services/firestore";

export interface IFormattedFriend {
	id: string;
	avatar: string;
	nickname: string;
	status: "active" | "nonActive";
	lastMessage: string;
}

const formatFriendList = async ({
	friendsList,
	currentUserID,
}: {
	friendsList: IFriend[];
	currentUserID: string;
}): Promise<IFormattedFriend[]> => {
	const formattedUserFriendList: IFormattedFriend[] = await Promise.all(
		friendsList.map(async (userFriend) => {
			const userFriendData = await getUser(userFriend.friendID);
			const lastUserToFriendMessage = userFriend.messages[userFriend.messages.length - 1];
			const friendToUser = userFriendData.data.friends_list.find((obj) => obj.friendID === currentUserID);
			const lastFriendToUserMessage = friendToUser?.messages[friendToUser?.messages.length - 1];
			let lastMessage = lastUserToFriendMessage.message;

			if (lastFriendToUserMessage) {
				lastMessage =
					lastUserToFriendMessage.created_at.seconds > lastFriendToUserMessage.created_at.seconds
						? lastUserToFriendMessage.message
						: lastFriendToUserMessage.message;
			}

			let status: "active" | "nonActive" = "nonActive";
			if (userFriendData.data.lastLoggedIn && userFriendData.data.lastLoggedOut) {
				status =
					userFriendData.data.lastLoggedIn.seconds > userFriendData.data.lastLoggedOut.seconds ? "active" : "nonActive";
			}

			return {
				id: userFriendData.id,
				avatar: userFriendData.data.avatar,
				nickname: userFriendData.data.nickname,
				status: status,
				lastMessage: lastMessage,
			};
		})
	);

	return formattedUserFriendList;
};

export default formatFriendList;
