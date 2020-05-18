import React, {useEffect, useState} from 'react';
import './App.css';
import Table from "./components/table";
import NewCarForm from "./components/newCarForm";
import {Box, Button} from "@material-ui/core";

function App() {
	const [items, setItems] = useState([]);
	const [carsHere, setCarsHere] = useState([]);
	const [showCarsHere, setShowCarsHere] = useState(false);

	const targetUrl = "http://80.249.84.47:11000/api/cars/",
		carsHereUrl = "http://80.249.84.47:11000/api/stat/here";

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
		fetch( carsHereUrl)
			.then(res => res.json())
			.then(
				(result) => {
					setCarsHere(result);
				},

				(error) => {
					console.log(error);
				}
			)
	}, []);

	let arrayCarsHere = [];
	items.filter((itemFromCarsHere) => {
		carsHere.forEach(item => {
			if (item.car === itemFromCarsHere.id) {
				arrayCarsHere.push(itemFromCarsHere);
			}
		});
	});

	function handleTableView() {
		setShowCarsHere(!showCarsHere);
	}

	return (
		<div className="App container">
			<Box className="header-wrapper">
				<NewCarForm/>
			</Box>
			<Box mb={5}>
				<Button
					variant="contained"
					onClick={handleTableView}>
					{showCarsHere ? 'Show all cars' : 'Show cars here'}
				</Button>
			</Box>
			<Table data={showCarsHere ? arrayCarsHere : items}/>
		</div>
	);
}

export default App;
