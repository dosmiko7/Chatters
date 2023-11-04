import useProfile from "./useProfile";

const Profile = () => {
	const { profileData, status } = useProfile();
	console.log(profileData);

	return <div>Profile</div>;
};

export default Profile;
