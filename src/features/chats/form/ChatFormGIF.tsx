import { useState } from "react";
import { TbGif } from "react-icons/tb";

import { Button } from "../../../ui/Button";
import styled from "styled-components";
import ChatFormGIFContainer from "./ChatFormGIFContainer";

const RelativeBox = styled.div`
	position: relative;
`;

const ChatFormGIF = () => {
	const [openGIFList, setOpenGIFList] = useState<boolean>(false);

	const handleOpenGIFList = () => {
		setOpenGIFList((prev) => !prev);
	};

	return (
		<>
			{openGIFList && <ChatFormGIFContainer />}
			<RelativeBox>
				<Button
					type="button"
					variant="menu"
					onClick={handleOpenGIFList}
				>
					<TbGif />
				</Button>
			</RelativeBox>
		</>
	);
};

export default ChatFormGIF;
