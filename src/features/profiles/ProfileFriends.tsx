import useFriends from "./useFriends";

const ProfileFriends = ({ friends }: { friends: any }) => {
	const friendsData = useFriends(friends);

	console.log(friendsData);

	return <div>ProfileFriends</div>;
};

export default ProfileFriends;
