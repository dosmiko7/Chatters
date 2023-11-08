import styled from "styled-components";
import { BiSearch } from "react-icons/bi";

import Modal from "../../ui/Modal";
import { Button } from "../../ui/Button";
import SearchesWindow from "./SearchesWindow";

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
					<BiSearch />
				</StyledButton>
			</Modal.Open>
			<Modal.Window name="searches">
				<SearchesWindow />
			</Modal.Window>
		</Modal>
	);
};

export default Searches;
