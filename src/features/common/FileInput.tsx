import { useFormContext } from "react-hook-form";
import { TbFile } from "react-icons/tb";
import styled from "styled-components";
import { toast } from "react-hot-toast";

import { displayInfo } from "../../style/Templates";
import HiddenInput from "../../ui/HiddenInput";
import Wrapper from "../../ui/Wrapper";
import { fileValidation } from "../../utils/validationTemplates";

const IconContainerForLabel = styled.div`
	${displayInfo({ message: "File input", position: "right" })}
	display: flex;
	padding: var(--padding-sm);
	color: var(--font-color);
	border-radius: var(--border-radius-circle);
	transition: var(--transition-all-3);
	&:hover {
		background-color: var(--color-secondary-100);
		cursor: pointer;
	}
`;

const fileValidationWithToast = (value: FileList | null, validExtensions?: string[]) => {
	const result = fileValidation(value, validExtensions);
	if (typeof result === "string") {
		toast.error(result);
	}
	return result;
};

const FileInput = ({ validExtensions }: { validExtensions?: string[] }) => {
	const { register } = useFormContext();

	return (
		<Wrapper>
			<label htmlFor="file">
				<IconContainerForLabel>
					<TbFile />
				</IconContainerForLabel>
			</label>
			<HiddenInput
				id="file"
				type="file"
				placeholder="File"
				{...register("file", { validate: (value) => fileValidationWithToast(value, validExtensions) })}
			/>
		</Wrapper>
	);
};

export default FileInput;
