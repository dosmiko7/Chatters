import { useContext } from "react";
import { BiEraser } from "react-icons/bi";
import styled from "styled-components";

import { DashboardOptionsContext } from "../../context/DashboardOptions";
import { Button } from "../../ui/Button";
import { displayInfo } from "../../style/Templates";

const EraserButton = styled(Button)`
	${displayInfo({ message: "Clear key", position: "bottom" })}
`;

const DashboardKeyRemove = () => {
	const { setKey } = useContext(DashboardOptionsContext);

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