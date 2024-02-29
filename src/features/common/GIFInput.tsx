import { Suspense, useEffect, useState, lazy } from "react";
import { useFormContext } from "react-hook-form";
import { TbGif } from "react-icons/tb";
import styled from "styled-components";

import { displayInfo, flexColumn } from "../../style/Templates";
import Button from "../../ui/Button";
import Container from "../../ui/Container";
import ThreeDots from "../../ui/ThreeDots";
const GIFContainer = lazy(() => import("./GIFContainer"));

const RelativeBox = styled.div`
	position: relative;
`;

const GIFButton = styled(Button)`
	${displayInfo({ message: "GIF input", position: "right" })};
	color: var(--font-color);
`;

const GIFWindow = styled(Container)`
	${flexColumn};
	position: absolute;
	top: -41rem;
	height: 40rem;
	width: 30rem;
	align-items: center;
	background-color: var(--color-primary-300);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-sm);
	border-right: none;
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
			{openGIFList && (
				<GIFWindow>
					<Suspense fallback={<ThreeDots />}>
						<GIFContainer isSubmit={isSubmit} />
					</Suspense>
				</GIFWindow>
			)}
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
