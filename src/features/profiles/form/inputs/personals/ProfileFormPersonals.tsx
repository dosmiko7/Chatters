import styled from "styled-components";

import Heading from "../../../../../ui/Heading";
import ProfileFormPersonalCity from "./ProfileFormPersonalCity";
import ProfileFormPersonalBirthday from "./ProfileFormPersonalBirthday";
import ProfileFormPersonalSurname from "./ProfileFormPersonalSurname";
import ProfileFormPersonalName from "./ProfileFormPersonalName";
import ProfileFormPersonalNickname from "./ProfileFormPersonalNickname";

const StyledPersonals = styled.div``;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, auto);
	gap: 0.6rem;
`;

const ProfileFormPersonals = () => {
	return (
		<StyledPersonals>
			<Heading as="h3">Personals</Heading>
			<ProfileFormPersonalNickname />
			<Grid>
				<ProfileFormPersonalName />
				<ProfileFormPersonalSurname />
				<ProfileFormPersonalBirthday />
				<ProfileFormPersonalCity />
			</Grid>
		</StyledPersonals>
	);
};

export default ProfileFormPersonals;
