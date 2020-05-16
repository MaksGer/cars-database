import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

function Table(props) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);
	const [carsHere, setCarsHere] = useState([]);
	const carsHereIdArr = [];

	var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
		targetUrl = "http://80.249.84.47:11000/api/cars/";


	var carsHereUrl = "http://80.249.84.47:11000/api/stat/here/ ";


	useEffect(() => {
			fetch(proxyUrl + targetUrl)
				.then(res => res.json())
				.then(
					(result) => {
						setIsLoaded(true);
						setItems(result);
					},
					// Note: it's important to handle errors here
					// instead of a catch() block so that we don't swallow
					// exceptions from actual bugs in components.
					(error) => {
						setIsLoaded(true);
					}
				);

				fetch( carsHereUrl)
					.then(res => res.json())
					.then(
						(result) => {
							console.log(result);
							result.map(item => carsHereIdArr.push(item.car));
							setCarsHere(result);
							console.log(carsHereIdArr);
						},
						// Note: it's important to handle errors here
						// instead of a catch() block so that we don't swallow
						// exceptions from actual bugs in components.
						(error) => {
							console.log(error);
						}
					)
		}, []);


	return (
		<div className="table-container" style={{ maxWidth: '80%' }}>
		<MaterialTable
			columns={[
				{ title: 'Brand', field: 'car_brand.name' },
				{ title: 'Model', field: 'car_model.name' },
				{ title: 'Number', field: 'car_number' },
				{ title: 'Tenancy', field: 'car_tenant.name' }
			]}
			data={items}
			title="All Cars"
		/>
		</div>
		// <ul>
		// 	{items.map((item, index) => {
		// 		return (
		// 			<li key={item.id}>
		// 				<span>{item.car_brand ? item.car_brand.name + '   ' : ' '}</span>
		// 				<span>{item.car_model ? item.car_model.name + '   ' : ' '}</span>
		// 				<span>{item.car_number}</span>
		// 			</li>
		// 		)
		// 	})}
		// </ul>
		//[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]
	);
}

export default Table;
