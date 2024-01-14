const getGifsUrls = (giphyResult: any) => {
	const gifsUrls: string[] = [];
	giphyResult.data.map((obj: any) => {
		const url = obj.images?.fixed_width?.url;
		if (url) {
			gifsUrls.push(url);
		}
	});
	return gifsUrls;
};

export default getGifsUrls;
