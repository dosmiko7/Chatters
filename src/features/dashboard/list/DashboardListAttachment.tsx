import styled from "styled-components";

import { flexCentered } from "../../../style/Templates";
import ImageElement from "../../../ui/ImageElement";
import AudioElement from "../../../ui/AudioElement";
import DownloadElement from "../../../ui/DownloadElement";
import VideoElement from "../../../ui/VideoElement";

const StyledAttachment = styled.div`
	${flexCentered};
	margin-top: 1rem;
`;

const DashboardListAttachment = ({ type, file }: { type: string; file: string }) => {
	let renderElement;
	switch (true) {
		case type.includes("audio"):
			renderElement = (
				<AudioElement
					fileSrc={file}
					type={type}
				/>
			);
			break;
		case type.includes("video"):
			renderElement = (
				<VideoElement
					fileSrc={file}
					type={type}
				/>
			);
			break;
		case type.includes("image"):
			renderElement = <ImageElement fileUrl={file} />;
			break;
		default:
			renderElement = (
				<DownloadElement
					fileUrl={file}
					filename="file"
				/>
			);
			break;
	}

	return <StyledAttachment>{renderElement}</StyledAttachment>;
};

export default DashboardListAttachment;
