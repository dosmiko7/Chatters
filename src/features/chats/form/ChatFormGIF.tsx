import { useState } from "react";
import { TbGif } from "react-icons/tb";

import { Button } from "../../../ui/Button";
import styled from "styled-components";
import ChatFormGIFList from "./ChatFormGIFList";

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
			{openGIFList && <ChatFormGIFList />}
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
