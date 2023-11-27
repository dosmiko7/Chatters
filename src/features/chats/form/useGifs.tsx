import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import fetchGifs, { IFetchGifsProps } from "../../../services/giphy";

const useGifs = () => {
	const [gifs, setGifs] = useState<string[]>([]);
	const reset = () => setGifs([]);

	const { mutate: getGifs, status } = useMutation({
		mutationFn: ({ key, offset }: IFetchGifsProps): Promise<string[]> => fetchGifs({ key, offset }),

		onSuccess: (gifs) => {
			setGifs((prev) => [...prev, ...gifs]);
		},
	});

	return { gifs, getGifs, reset, status };
};

export default useGifs;
