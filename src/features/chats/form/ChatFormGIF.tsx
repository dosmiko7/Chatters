import { TbGif } from "react-icons/tb";

import { Button } from "../../../ui/Button";
import styled from "styled-components";

const RelativeBox = styled.div`
	position: relative;
`;

const ChatFormGIF = () => {
	return (
		<RelativeBox>
			<Button
				type="button"
				variant="menu"
			>
				<TbGif />
			</Button>
		</RelativeBox>
	);
};

export default ChatFormGIF;
