import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

import useGifs from "./useGifs";
import List from "../../../ui/List";
import { ListElement } from "../../../ui/ListElement";
import { flexCentered } from "../../../style/Templates";
import GIFWindow, { GIFKeyInput } from "../../../ui/GIFWindow";

const ListContainer = styled.div`
	width: 100%;
	margin-top: 1rem;
	overflow-y: scroll;
`;

const EmptyInfo = styled.div`
	font-size: 1.6rem;
	${flexCentered};
	height: 100%;
`;

const GIF = styled.img`
	width: 100%;
	height: auto;

	&:hover {
		cursor: pointer;
	}
`;

const ChatFormGIFList = () => {
	const [input, setInput] = useState<string>("");
	const [currentKey, setCurrentKey] = useState<string>("");
	const [offset, setOffset] = useState<number>(0);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const { gifs, getGifs, reset } = useGifs();

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
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
			setOffset((prev) => prev + 6);
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
			<List<string>
				data={gifs}
				render={(gifSrc: string) => {
					return (
						<ListElement key={gifSrc}>
							<GIF src={gifSrc} />
						</ListElement>
					);
				}}
			/>
		</ListContainer>
	);

	return (
		<GIFWindow>
			<GIFKeyInput
				placeholder="GIF about..."
				type="text"
				onChange={(event) => setInput(event.target.value)}
				onKeyDown={handleKeyDown}
			/>
			{renderElement}
		</GIFWindow>
	);
};

export default ChatFormGIFList;
