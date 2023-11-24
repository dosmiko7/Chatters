import { useFormContext } from "react-hook-form";
import { TbFile } from "react-icons/tb";

import { Wrapper } from "../../../ui/Wrapper";
import IconContainerForLabel from "../../../ui/IconContainerForLabel";

const ChatFormFile = () => {
	const { register } = useFormContext();

	const fileValidation = (value: File[] | null) => {
		if (value?.length) {
			const file = value[0];
			const maxSizeInBytes = 4 * 1024 * 1024;

			if (file.size > maxSizeInBytes) {
				return "File size should be less than 1 MB";
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
			<input
				id="file"
				type="file"
				placeholder="File"
				style={{ display: "none" }}
				{...register("file", { validate: fileValidation })}
			/>
		</Wrapper>
	);
};

export default ChatFormFile;
