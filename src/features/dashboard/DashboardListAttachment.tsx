import AudioElement from "../../ui/AudioElement";
import DownloadElement from "../../ui/DownloadElement";
import VideoElement from "../../ui/VideoElement";

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
			renderElement = <img src={file} />;
			break;
		default:
			<DownloadElement
				fileUrl={file}
				filename="file"
			/>;
			break;
	}

	return <div>{renderElement}</div>;
};

export default DashboardListAttachment;
