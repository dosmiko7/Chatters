import Container from "../../ui/Container";
import Heading from "../../ui/Heading";
import SettingsOptions from "./options/SettingsOptions";

const SettingsDetail = () => {
	return (
		<Container>
			<Heading as="h2">Settings</Heading>
			<SettingsOptions />
		</Container>
	);
};

export default SettingsDetail;
