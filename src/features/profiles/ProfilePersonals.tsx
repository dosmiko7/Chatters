import styled from "styled-components";

import { flexColumn } from "../../style/Templates";
import Heading from "../../ui/Heading";
import { formatDate } from "../../utils/formatDate";
import { Timestamp } from "firebase/firestore";

const StyledPersonals = styled.div`
	${flexColumn};
`;

const Column = styled.div`
	${flexColumn}
`;
const Personal = styled.span``;

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
					<Heading as="h4">Name: </Heading>
					{name}
				</Personal>
			)}
			{surname && (
				<Personal>
					<Heading as="h4">Surname: </Heading>
					{surname}
				</Personal>
			)}
			{formattedBirthday && (
				<Personal>
					<Heading as="h4">Birthday: </Heading>
					{formattedBirthday}
				</Personal>
			)}
			{city && (
				<Personal>
					<Heading as="h4">City: </Heading>
					{city}
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
