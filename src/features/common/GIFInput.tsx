import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TbGif } from "react-icons/tb";
import styled from "styled-components";

import { Button } from "../../ui/Button";
import GIFContainer from "./GIFContainer";

const RelativeBox = styled.div`
	position: relative;
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
			<Button
				type="button"
				variant="menu"
				onClick={handleOpenGIFList}
			>
				<TbGif />
			</Button>
		</RelativeBox>
	);
};

export default GIFInput;
