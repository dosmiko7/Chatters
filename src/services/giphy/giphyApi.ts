import getGifsUrls from "../../utils/getGifsUrls";

const giphyKey = "KZ8BFutjfwdu7D9bcSgZqBMD2poam4nM";

export interface IFetchGifsProps {
	key: string;
	offset: number;
}

const fetchGifs = async ({ key, offset }: IFetchGifsProps) => {
	try {
		const response = await fetch(
			`https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${key}&limit=5&offset=${offset}&rating=g&lang=en&bundle=clips_grid_picker`
		);
		const result = await response.json();
		const gifs = getGifsUrls(result);
		return gifs;
	} catch {
		throw new Error("fetchGifs: fetching gifs failed");
	}
};

export default fetchGifs;
