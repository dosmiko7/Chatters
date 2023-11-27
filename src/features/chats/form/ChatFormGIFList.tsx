import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
	position: fixed;
	font-size: 1.6rem;
	border-radius: var(--border-radius-sm);
	padding: var(--padding-xsm);
	background-color: var(--color-primary-400);
`;

const ListContainer = styled.div`
	overflow-y: scroll;
`;

const EmptyInfo = styled.div`
	font-size: 1.6rem;
	${flexCentered};
	height: 100%;
`;

const GIFElement = styled(ListElement)`
	width: 6rem;
	height: 6rem;
`;

const ChatFormGIFList = () => {
	const { register } = useForm();
	const [offset, setOffset] = useState<number>(0);
	const { gifs, getGifs, status } = useGifs();

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
						<GIFElement>
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
				{...register("gifKey")}
			/>
			{renderElement}
		</AbsoluteBox>
	);
};

export default ChatFormGIFList;
