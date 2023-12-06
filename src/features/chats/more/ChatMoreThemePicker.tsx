import styled from "styled-components";
import { themes } from "../../../data/themes";
import useChatCustomization from "./useChatCustomization";
import { useModal } from "../../../hooks/useModal";

interface IPickerProps {
	background: string;
}

const Box = styled.div`
	width: 100%;
	height: 90%;
	overflow-y: scroll;
`;

const Picker = styled.div<IPickerProps>`
	width: 5rem;
	height: 5rem;
	position: relative;
	border-radius: var(--border-radius-circle);
	background: ${(props) => props.background};
	transition: var(--transition-all-3);

	&::before {
		content: "";
		position: absolute;
		border: 2px solid transparent;
		width: 100%;
		height: 100%;
		border-radius: var(--border-radius-circle);
	}

	&:hover {
		cursor: pointer;
		&::before {
			border: 2px solid var(--color-green-100);
		}
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
	grid-gap: 1rem;
	justify-content: center;
	justify-items: center;
	max-width: 100%;
`;

const ChatMoreThemePicker = () => {
	const { changeCustomization } = useChatCustomization();
	const { close } = useModal();

	const onThemeClickHandler = (theme: string) => {
		changeCustomization({ theme });
		close();
	};

	return (
		<Box>
			<Grid>
				{themes.map((theme) => {
					return (
						<Picker
							background={theme.background}
							onClick={() => onThemeClickHandler(theme.theme)}
						/>
					);
				})}
			</Grid>
		</Box>
	);
};

export default ChatMoreThemePicker;
