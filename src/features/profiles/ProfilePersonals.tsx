import styled from "styled-components";

import { flexColumn, flexRow } from "../../style/Templates";
import Heading from "../../ui/Heading";
import { formatDate } from "../../utils/formatDate";
import { Timestamp } from "firebase/firestore";

const StyledPersonals = styled.div`
	${flexColumn};
`;

const Column = styled.div`
	${flexColumn}
`;

const Personal = styled.div`
	${flexRow}
	align-items: center;
`;
const PersonalInfo = styled.span`
	padding-left: var(--padding-xsm);
`;

interface IPersonals {
	personals: {
		name?: string;
		surname?: string;
		birthday?: Timestamp;
		city?: string;
	};
}

const ProfilePersonals = ({ personals }: IPersonals) => {
	const { name, surname, birthday, city } = personals;
	const formattedBirthday = birthday ? formatDate(birthday) : undefined;

	const noPersonals = <div>No personal details</div>;
	const hasPersonals = (
		<Column>
			{name && (
				<Personal>
					<Heading as="h3">Name: </Heading>
					<PersonalInfo>{name}</PersonalInfo>
				</Personal>
			)}
			{surname && (
				<Personal>
					<Heading as="h3">Surname: </Heading>
					<PersonalInfo>{surname}</PersonalInfo>
				</Personal>
			)}
			{formattedBirthday && (
				<Personal>
					<Heading as="h3">Birthday: </Heading>
					<PersonalInfo>{formattedBirthday}</PersonalInfo>
				</Personal>
			)}
			{city && (
				<Personal>
					<Heading as="h3">City: </Heading>
					<PersonalInfo>{city}</PersonalInfo>
				</Personal>
			)}
		</Column>
	);

	return (
		<StyledPersonals>
			<Heading
				as="h3"
				center
			>
				Personals
			</Heading>
			{Object.keys(personals).length ? hasPersonals : noPersonals}
		</StyledPersonals>
	);
};

export default ProfilePersonals;
