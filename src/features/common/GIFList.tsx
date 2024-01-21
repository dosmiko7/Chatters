import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import List from "../../ui/List";
import ListElement from "../../ui/ListElement";
import HiddenInput from "../../ui/HiddenInput";

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

const GIFList = ({ gifs, isSubmit }: { gifs: string[]; isSubmit: boolean }) => {
	const { register, setValue } = useFormContext();

	return (
		<List<string>
			data={gifs}
			render={(gifSrc: string, index: number) => {
				return (
					<ListElement key={index}>
						{isSubmit && (
							<HiddenInput
								{...register("gif")}
								type="submit"
								placeholder="GIF input"
								id={gifSrc}
								value={gifSrc}
							/>
						)}
						<GIFElement
							aria-label="GIF element"
							htmlFor={gifSrc}
							onClick={() => setValue("gif", gifSrc)}
						>
							<GIF src={gifSrc} />
						</GIFElement>
					</ListElement>
				);
			}}
		/>
	);
};

export default GIFList;
