const giphyKey = "KZ8BFutjfwdu7D9bcSgZqBMD2poam4nM";

const fetchGifs = async ({ key, offset }: { key: string; offset: number }) => {
	const response = await fetch(
		`https://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&q=${key}&limit=9&offset=${offset}&rating=g&lang=en&bundle=clips_grid_picker`
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

export default fetchGifs;
