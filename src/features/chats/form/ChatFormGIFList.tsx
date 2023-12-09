import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import List from "../../../ui/List";
import { ListElement } from "../../../ui/ListElement";
import HiddenInput from "../../../ui/HiddenInput";

const GIFElement = styled.label`
	width: 100%;
`;

const GIF = styled.img`
	width: 100%;
	height: auto;

	&:hover {
		cursor: pointer;
	}
`;

const ChatFormGIFList = ({ gifs }: { gifs: string[] }) => {
	const { register, setValue } = useFormContext();

	return (
		<List<string>
			data={gifs}
			render={(gifSrc: string) => {
				return (
					<ListElement key={gifSrc}>
						<GIFElement
							htmlFor={gifSrc}
							onClick={() => setValue("gif", gifSrc)}
						>
							<GIF src={gifSrc} />
						</GIFElement>
						<HiddenInput
							{...register("gif")}
							type="submit"
							id={gifSrc}
							value={gifSrc}
						/>
					</ListElement>
				);
			}}
		/>
	);
};

export default ChatFormGIFList;
