import { useFormContext } from "react-hook-form";
import { TbFile } from "react-icons/tb";
import styled from "styled-components";
import { toast } from "react-hot-toast";

import HiddenInput from "../../ui/HiddenInput";
import { displayInfo } from "../../style/Templates";

const IconContainerForLabel = styled.div`
	${displayInfo({ message: "File input", position: "right" })}
	display: flex;
	padding: var(--padding-sm);
	border-radius: var(--border-radius-circle);
	transition: var(--transition-all-3);
	&:hover {
		background-color: var(--color-secondary-100);
		cursor: pointer;
	}
`;

const fileValidation = (value: FileList | null) => {
	if (value?.length) {
		const file = value[0];
		const maxSizeInBytes = 1 * 1024 * 1024;

		if (file.size > maxSizeInBytes) {
			toast.error("File size should be less than 1 MB");
			return false;
		}
	}

	return true;
};

const FileInput = () => {
	const { register } = useFormContext();

	return (
		<div>
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
		</div>
	);
};

export default FileInput;
