import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import fetchGifs, { IFetchGifsProps } from "../../../services/giphy";

const useGifs = () => {
	const [gifs, setGifs] = useState<string[]>([]);

	const { mutate: getGifs, status } = useMutation({
		mutationFn: ({key, offset, endpoint}: IFetchGifsProps): Promise<string[]> => fetchGifs({ key, offset, endpoint }),

		onSuccess: (gifs) => {
			setGifs((prev) => [...prev, ...gifs]);
		},
	});

	return { gifs, getGifs, status };
};

export default useGifs;
