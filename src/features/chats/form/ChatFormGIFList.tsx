import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import List from "../../../ui/List";
import { ListElement } from "../../../ui/ListElement";

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
					<ListElement
						key={gifSrc}
						onClick={() => setValue("gif", gifSrc)}
					>
						<GIFElement htmlFor={gifSrc}>
							<GIF src={gifSrc} />
						</GIFElement>
						<input
							{...register("gif")}
							type="submit"
							id={gifSrc}
							value={gifSrc}
							style={{ display: "none" }}
						/>
					</ListElement>
				);
			}}
		/>
	);
};

export default ChatFormGIFList;
