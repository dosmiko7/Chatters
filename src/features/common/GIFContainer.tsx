import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

import useGifs from "../../hooks/useGifs";
import { flexCentered } from "../../style/Templates";
import GIFList from "./GIFList";

const ListContainer = styled.div.attrs({
	"data-testid": "list-container",
})`
	width: 100%;
	margin-top: 1rem;
	overflow-y: scroll;
`;

const EmptyInfo = styled.div`
	font-size: 1.6rem;
	${flexCentered};
	height: 100%;
`;

const GIFKeyInput = styled.input`
	position: sticky;
	font-size: 1.6rem;
	width: 100%;
	border-radius: var(--border-radius-sm);
	padding: var(--padding-xsm);
	background-color: var(--color-primary-400);
`;

const OFFSET_RANGE = 6;

const GIFContainer = ({ isSubmit }: { isSubmit: boolean }) => {
	const [input, setInput] = useState<string>("");
	const [currentKey, setCurrentKey] = useState<string>("");
	const [offset, setOffset] = useState<number>(0);
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { gifs, getGifs, reset } = useGifs();

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			if (input !== currentKey) {
				setOffset(0);
				reset();
				setScrollPosition(0);
				setCurrentKey(input);
			}
		}
	};

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		const bottom = Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) < 1;
		if (bottom) {
			setScrollPosition(target.scrollTop);
			setOffset((prev) => prev + OFFSET_RANGE);
		}
	};

	useEffect(() => {
		getGifs({ key: currentKey, offset });
	}, [currentKey, offset, getGifs]);

	useLayoutEffect(() => {
		containerRef.current?.scrollTo({ top: scrollPosition });
	});

	const renderElement = !gifs.length ? (
		<EmptyInfo>
			<p>Such empty 😔</p>
		</EmptyInfo>
	) : (
		<ListContainer
			onScroll={handleScroll}
			ref={containerRef}
		>
			<GIFList
				gifs={gifs}
				isSubmit={isSubmit}
			/>
		</ListContainer>
	);

	return (
		<>
			<GIFKeyInput
				placeholder="GIF about..."
				type="text"
				onChange={(event) => setInput(event.target.value)}
				onKeyDown={handleKeyDown}
			/>
			{renderElement}
		</>
	);
};

export default GIFContainer;
