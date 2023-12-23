import { Container } from "../../ui/Container";
import Heading from "../../ui/Heading";
import SettingsOptions from "./SettingsOptions";

const SettingsDetail = () => {
	return (
		<Container>
			<Heading as="h2">Settings</Heading>
			<SettingsOptions />
		</Container>
	);
};

export default SettingsDetail;
