import styled from "styled-components";
import { BiUserPlus } from "react-icons/bi";

import Modal from "../../ui/Modal";
import { Button } from "../../ui/Button";

const StyledButton = styled(Button)`
	font-size: 2.2rem;
`;

const Searches = () => {
	return (
		<Modal>
			<Modal.Open opens="searches">
				<StyledButton
					variant="menu"
					size="medium"
				>
					<BiUserPlus />
				</StyledButton>
			</Modal.Open>
			<Modal.Window name="searches">
				<div>SearchesWindow</div>
			</Modal.Window>
		</Modal>
	);
};

export default Searches;
