import { IFriend, getUser } from "../services/firestore";

interface IFormattedFriends {
	id: string;
	avatar: string;
	nickname: string;
	status: string;
	lastMessage: string;
}

const formatFriendList = ({
	friendsList,
	currentUserID,
}: {
	friendsList: IFriend[];
	currentUserID: string;
}): IFormattedFriends[] => {
	const formattedUserFriendList: IFormattedFriends[] = [];

	friendsList.forEach(async (userFriend) => {
		const userFriendData = await getUser(userFriend.friendID);
		const lastUserToFriendMessage = userFriend.messages[userFriend.messages.length - 1];
		const friendToUser = userFriendData.data.friends_list.find((obj) => obj.friendID === currentUserID);
		const lastFriendToUserMessage = friendToUser?.messages[friendToUser?.messages.length - 1];

		let lastMessage = "to: " + lastUserToFriendMessage.message;
		if (lastFriendToUserMessage) {
			lastMessage =
				lastUserToFriendMessage.created_at.seconds > lastFriendToUserMessage?.created_at.seconds
					? "to: " + lastUserToFriendMessage.message
					: "from: " + lastFriendToUserMessage.message;
		}

		let status = "unavailable";
		if (userFriendData.data.lastLoggedIn && userFriendData.data.lastLoggedOut) {
			status =
				userFriendData.data.lastLoggedIn.seconds > userFriendData.data.lastLoggedOut.seconds ? "active" : "unavailable";
		}

		formattedUserFriendList.push({
			id: userFriendData.id,
			avatar: userFriendData.data.avatar,
			nickname: userFriendData.data.nickname,
			status: status,
			lastMessage: lastMessage,
		});
	});

	return formattedUserFriendList;
};

export default formatFriendList;
