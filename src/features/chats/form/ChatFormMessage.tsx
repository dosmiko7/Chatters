import { useFormContext } from "react-hook-form";
import { Input } from "../../../ui/Input";
import styled from "styled-components";
import useFilePreview from "../../profiles/form/useFilePreview";
import { flexRow } from "../../../style/Templates";
import { Button } from "../../../ui/Button";
import { HiXMark } from "react-icons/hi2";

const MessageContainer = styled.div`
	border-radius: var(--border-radius-md);
	padding: var(--padding-xsm);
	background-color: var(--color-primary-300);
	overflow: hidden;
	flex-grow: 1;
`;

const Box = styled.div`
	${flexRow};
	align-items: center;
	gap: 0.4rem;
	background-color: var(--color-primary-300);
`;

const FileRemove = styled(Button)`
	padding: var(--padding-xsm);
`;

const FileName = styled.p``;

const FilePreview = styled.img`
	width: auto;
	height: 6rem;
	border-radius: var(--border-radius-sm);
`;

const StyledMessageInput = styled(Input)`
	background-color: inherit;
	border: none;
	width: 100%;
	height: 80%;

	&:hover {
		background-color: var(--color-primary-300);
		border: none;
		outline: none;
	}

	&:focus {
		border: none;
		outline: none;
	}
`;

const ChatFormMessage = ({ watcher, status }: { watcher: File[] | null; status: string }) => {
	const { register, setValue } = useFormContext();
	const { imgSrc } = useFilePreview(watcher);

	const currentFileSrc = imgSrc || "/fileIcon.png";

	const handleOnRemove = () => {
		setValue("file", null);
	};

	return (
		<MessageContainer>
			{watcher && watcher[0] && (
				<Box>
					<FileRemove
						variant="menu"
						onClick={handleOnRemove}
					>
						<HiXMark style={{ fontSize: "2rem" }} />
					</FileRemove>
					<FileName>{watcher[0].name}</FileName>
					<FilePreview src={currentFileSrc} />
				</Box>
			)}
			<StyledMessageInput
				disabled={status === "pending"}
				placeholder="Message..."
				type="text"
				{...register("message")}
			/>
		</MessageContainer>
	);
};

export default ChatFormMessage;
