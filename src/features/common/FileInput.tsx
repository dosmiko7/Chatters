import { useFormContext } from "react-hook-form";
import { TbFile } from "react-icons/tb";
import styled from "styled-components";
import { toast } from "react-hot-toast";

import { Wrapper } from "../../ui/Wrapper";
import HiddenInput from "../../ui/HiddenInput";

const IconContainerForLabel = styled.div`
	display: flex;
	padding: var(--padding-sm);
	border-radius: var(--border-radius-circle);
	transition: var(--transition-all-3);
	&:hover {
		background-color: var(--color-secondary-100);
		cursor: pointer;
	}
`;

const FileInput = () => {
	const { register, setValue } = useFormContext();

	const fileValidation = (value: FileList | null) => {
		if (value?.length) {
			const file = value[0];
			const maxSizeInBytes = 4 * 1024 * 1024;

			if (file.size > maxSizeInBytes) {
				setValue("file", null);
				toast.error("File size should be less than 1 MB");
			}
		}

		return true;
	};

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
				{...register("file", { validate: fileValidation })}
			/>
		</Wrapper>
	);
};

export default FileInput;