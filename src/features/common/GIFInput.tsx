import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TbGif } from "react-icons/tb";
import styled from "styled-components";

import { Button } from "../../ui/Button";
import GIFContainer from "./GIFContainer";
import { displayInfo } from "../../style/Templates";

const RelativeBox = styled.div`
	position: relative;
`;

const GIFButton = styled(Button)`
	${displayInfo({ message: "GIF input", position: "right" })}
`;

const GIFInput = ({ isSubmit }: { isSubmit: boolean }) => {
	const [openGIFList, setOpenGIFList] = useState<boolean>(false);
	const { watch } = useFormContext();

	const handleOpenGIFList = () => {
		setOpenGIFList((prev) => !prev);
	};

	const gifWatcher = watch("gif");

	useEffect(() => {
		const closeWindow = () => {
			if (gifWatcher) setOpenGIFList(false);
		};

		closeWindow();
	}, [gifWatcher]);

	return (
		<RelativeBox>
			{openGIFList && <GIFContainer isSubmit={isSubmit} />}
			<GIFButton
				type="button"
				variant="menu"
				onClick={handleOpenGIFList}
			>
				<TbGif />
			</GIFButton>
		</RelativeBox>
	);
};

export default GIFInput;
