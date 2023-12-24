import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import fetchGifs, { IFetchGifsProps } from "../services/giphy/giphyApi";

const useGifs = () => {
	const [gifs, setGifs] = useState<string[]>([]);
	const reset = () => setGifs([]);

	const { mutate: getGifs } = useMutation({
		mutationFn: ({ key, offset }: IFetchGifsProps): Promise<string[]> => fetchGifs({ key, offset }),

		onSuccess: (gifs) => {
			setGifs((prev) => [...prev, ...gifs]);
		},
	});

	return { gifs, getGifs, reset };
};

export default useGifs;
