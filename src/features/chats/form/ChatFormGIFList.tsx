import { useState } from "react";
import styled from "styled-components";

import useGifs from "./useGifs";
import List from "../../../ui/List";
import { ListElement } from "../../../ui/ListElement";
import { Container } from "../../../ui/Container";
import { flexCentered, flexColumn } from "../../../style/Templates";
import Spinner from "../../../ui/Spinner";

const AbsoluteBox = styled(Container)`
	position: absolute;
	top: -30rem;
	height: 30rem;
	width: 25rem;
	${flexColumn};
	align-items: center;
	background-color: var(--color-primary-300);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-sm);
	border-right: none;
`;

const KeyInput = styled.input`
	position: sticky;
	font-size: 1.6rem;
	border-radius: var(--border-radius-sm);
	padding: var(--padding-xsm);
	background-color: var(--color-primary-400);
`;

const ListContainer = styled.div`
	margin-top: 1rem;
	overflow-y: scroll;
`;

const EmptyInfo = styled.div`
	font-size: 1.6rem;
	${flexCentered};
	height: 100%;
`;

const GIFElement = styled(ListElement)`
	width: 100%;
	height: auto;
	&:hover {
		cursor: pointer;
	}
`;

const ChatFormGIFList = () => {
	const [value, setValue] = useState<string>("");
	const [offset, setOffset] = useState<number>(-1);
	const { gifs, getGifs, status } = useGifs();

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			console.log(value);
			setOffset((prev) => prev + 1);
			getGifs({ key: value, offset });
		}
	};

	let renderElement = !gifs.length ? (
		<EmptyInfo>
			<p>Such empty 😔</p>
		</EmptyInfo>
	) : (
		<ListContainer>
			<List<string>
				data={gifs}
				render={(gifSrc: string) => {
					return (
						<GIFElement key={gifSrc}>
							<img src={gifSrc} />
						</GIFElement>
					);
				}}
			/>
		</ListContainer>
	);
	renderElement = status === "pending" ? <Spinner /> : renderElement;

	return (
		<AbsoluteBox>
			<KeyInput
				placeholder="GIF about..."
				type="text"
				onChange={(event) => setValue(event.target.value)}
				onKeyDown={handleKeyDown}
			/>
			{renderElement}
		</AbsoluteBox>
	);
};

export default ChatFormGIFList;
