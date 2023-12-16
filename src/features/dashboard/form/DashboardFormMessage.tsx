import { useState } from "react";
import { useWatch } from "react-hook-form";
import styled from "styled-components";

import useFilePreview from "../../../hooks/useFilePreview";
import DashboardFormAttachment from "./DashboardFormAttachment";
import { flexColumn } from "../../../style/Templates";

const StyledDashboardFormMessage = styled.div`
	${flexColumn};
	width: 100%;
	max-height: 80%;
	background-color: var(--color-primary-500);
	border-radius: var(--border-radius-sm);
`;

const TextContainer = styled.div`
	height: 20%;
`;

const Textarea = styled.textarea`
	background-color: transparent;
	width: 100%;
	resize: none;
	font-size: 1.8rem;
	padding: 0.6rem;

	&:focus {
		outline: none;
	}
`;

const Counter = styled.div`
	float: right;
	padding-right: 10px;
`;

const MAX_CHARS = 200;

const DashboardFormMessage = () => {
	const fileWatcher: FileList | null = useWatch({ name: "file" });
	const gifSrc: string = useWatch({ name: "gif" });
	const [charsCount, setCharsCount] = useState<number>(0);
	const { imgSrc } = useFilePreview(fileWatcher);

	const currentSrc = gifSrc || imgSrc;

	return (
		<StyledDashboardFormMessage>
			<TextContainer>
				<Textarea
					maxLength={MAX_CHARS}
					onChange={(e) => setCharsCount(e.target.value.length)}
					placeholder="Post message..."
				/>
				<Counter>
					{charsCount} / {MAX_CHARS}
				</Counter>
			</TextContainer>
			{currentSrc && <DashboardFormAttachment currentSrc={currentSrc} />}
		</StyledDashboardFormMessage>
	);
};

export default DashboardFormMessage;
