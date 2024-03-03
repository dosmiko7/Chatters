import { BiEraser } from "react-icons/bi";
import styled from "styled-components";

import useDashboardOptions from "../../../context/useDashboardOptions";
import { displayInfo } from "../../../style/Templates";
import Button from "../../../ui/Button";

const EraserButton = styled(Button)`
	${displayInfo({ message: "Clear key", position: "bottom" })}
`;

const DashboardKeyRemove = () => {
	const { setKey } = useDashboardOptions();

	return (
		<EraserButton
			variant="menu"
			size="large"
			onClick={() => setKey(null)}
		>
			<BiEraser />
		</EraserButton>
	);
};

export default DashboardKeyRemove;
