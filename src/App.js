import React from 'react';
import './App.css';
import Table from "./components/table";
import NewCarForm from "./components/newCarForm";
import {Box} from "@material-ui/core";

function App() {
	return (
		<div className="App container">
			<Box className="header-wrapper">
				<NewCarForm/>
			</Box>
			<Table/>
		</div>
	);
}

export default App;
