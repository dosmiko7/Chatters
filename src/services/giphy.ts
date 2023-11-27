const giphyKey = "KZ8BFutjfwdu7D9bcSgZqBMD2poam4nM";

export interface IFetchGifsProps {
	key: string;
	offset: number;
	endpoint?: "search" | "random";
}

const fetchGifs = async ({ key, offset, endpoint }: IFetchGifsProps) => {
	const response = await fetch(
		`https://api.giphy.com/v1/gifs/${endpoint}?api_key=${giphyKey}&q=${key}&limit=5&offset=${offset}&rating=g&lang=en&bundle=clips_grid_picker`
	).catch((error) => {
		throw error;
	});
	const result = await response.json();
	const gifs: string[] = [];
	result.data.map((obj: any) => {
		gifs.push(obj.images.fixed_width.url);
	});
	return gifs;
};

fetchGifs.defaultValues = {
	endpoint: "search",
};

export default fetchGifs;
