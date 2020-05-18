import React from 'react';
import MaterialTable from 'material-table';

function Table({data}) {
	return (
		<div className="table-container" style={{maxWidth: {xs: '100%', md: '80%'}}}>
			<MaterialTable
				columns={[
					{title: 'Brand', field: 'car_brand.name'},
					{title: 'Model', field: 'car_model.name'},
					{title: 'Number', field: 'car_number'},
					{title: 'Tenancy', field: 'car_tenant.name'}
				]}
				data={data}
				title="All Cars"
			/>
		</div>
	);
}

export default Table;
