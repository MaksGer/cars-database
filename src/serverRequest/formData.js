const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
	targetUrl = "http://80.249.84.47:11000/api/cars/brands/";

export const getAllBrands = () => {
	// const result = [];

	fetch(proxyUrl + targetUrl)
		.then(res => res.json())
		.then(
			(result) => {
				// console.log(result);
				return result;
			},
			(error) => {
				console.log(error);
			}
		)
};
