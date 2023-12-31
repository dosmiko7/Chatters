import styled from "styled-components";

import { flexColumn, flexRow } from "../../style/Templates";
import Heading from "../../ui/Heading";
import Info from "../../ui/Info";

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
	margin-bottom: 0.6rem;
`;

interface IPersonals {
	personals: {
		name?: string;
		surname?: string;
		birthday?: string;
		city?: string;
	};
}

const ProfilePersonals = ({ personals }: IPersonals) => {
	const { name, surname, birthday, city } = personals;

	const noPersonals = <Info>No personal details</Info>;
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
			{birthday && (
				<Personal>
					<Heading as="h3">Birthday: </Heading>
					<PersonalInfo>{birthday}</PersonalInfo>
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
