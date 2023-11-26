const ChatMessageMusic = ({ fileSrc, type }: { fileSrc: string; type: string }) => {
	return (
		<audio controls>
			<source
				src={fileSrc}
				type={type}
			/>
			Your browser does not support the audio tag.
		</audio>
	);
};

export default ChatMessageMusic;
