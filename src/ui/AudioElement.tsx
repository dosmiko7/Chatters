import { useCallback } from "react";
import styled from "styled-components";

import { fileElementStyle } from "../style/Templates";

const StyledAudioElement = styled.audio`
	${fileElementStyle};
`;

const AudioElement = ({ fileSrc, type }: { fileSrc: string; type: string }) => {
	const defaultVolume = useCallback((audioElement: HTMLAudioElement | null) => {
		if (audioElement) {
			audioElement.volume = 0.5;
		}
	}, []);

	return (
		<StyledAudioElement
			controls
			ref={defaultVolume}
		>
			<source
				src={fileSrc}
				type={type}
			/>
			Your browser does not support the audio tag.
		</StyledAudioElement>
	);
};

export default AudioElement;
