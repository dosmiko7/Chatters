const getGifsUrls = (giphyResult: any) => {
	const gifsUrls: string[] = [];
	giphyResult.data.map((obj: any) => {
		gifsUrls.push(obj.images.fixed_width.url);
	});
	return gifsUrls;
};

export default getGifsUrls;
