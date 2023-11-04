import { useState } from "react";
import Wave from "../ui/Wave";

const useWaveAnimation = (containerRef: React.MutableRefObject<HTMLElement | null>) => {
	const [waves, setWaves] = useState<JSX.Element[]>([]);

	const removeRipple = (index: number) => {
		const updatedRipples = [...waves];
		updatedRipples.splice(index, 1);
		setWaves(updatedRipples);
	};

	const handleAnimation = (e: React.MouseEvent<HTMLElement>) => {
		if (containerRef.current) {
			const rect = containerRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const wave = (
				<Wave
					key={waves.length}
					style={{ left: `${x}px`, top: `${y}px` }}
					onAnimationEnd={() => removeRipple(waves.length)}
				/>
			);

			setWaves([...waves, wave]);
		}
	};

	return { waves, handleAnimation };
};

export default useWaveAnimation;
