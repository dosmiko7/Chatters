import { IFriend } from "../services/firestore";

export const getUsersID = (friendsList: IFriend[]) => {
	const usersID: string[] = [];

	friendsList.forEach((friend) => {
		usersID.push(friend.friendID);
	});

	return usersID;
};
