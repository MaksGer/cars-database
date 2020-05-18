import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';

function Table() {
	const [items, setItems] = useState([]);

	const targetUrl = "http://80.249.84.47:11000/api/cars/";

	useEffect(() => {
		fetch(targetUrl)
			.then(res => res.json())
			.then(
				(result) => {
					setItems(result);
				},
				(error) => {
					console.log(error)
				}
			);
	}, []);


	return (
		<div className="table-container" style={{maxWidth: {xs: '100%', md: '80%'}}}>
			<MaterialTable
				columns={[
					{title: 'Brand', field: 'car_brand.name'},
					{title: 'Model', field: 'car_model.name'},
					{title: 'Number', field: 'car_number'},
					{title: 'Tenancy', field: 'car_tenant.name'}
				]}
				data={items}
				title="All Cars"
			/>
		</div>
	);
}

export default Table;
