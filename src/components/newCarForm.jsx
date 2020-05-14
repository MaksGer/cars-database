import React, {useEffect, useState} from 'react';
import {
	Box,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	FormControl,
	FormHelperText,
	InputLabel,
	Input,
	MenuItem,
	Select,
	Typography, Button
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getAllBrands} from "../serverRequest/formData";


const NewCarForm = () => {
	const [brands, setBrands] = useState([]);
	const [cars, setCars] = useState([]);
	const [tenants, setTenants] = useState([]);
	const [selectBrand, setSelectBrand] = useState([]);
	const allCarsThisBrand = "http://80.249.84.47:11000/api/cars/brands/";
	const [invalidFlagCarNumber, setInvalidFlagCarNumber] = useState(true);

	const handleBrandSelect = (event) => {
		setSelectBrand(event.target.value);
		getCarsActiveBrand(event.target.value);
	};

	const getCarsActiveBrand = (id) => {
		fetch(allCarsThisBrand + id + "/")
			.then(res => res.json())
			.then(
				(result) => {
					// console.log(result);
					setCars(result);
				},
				(error) => {
					console.log(error);
				}
			);
	};

	useEffect(() => {
		const proxyUrl = "https://cors-anywhere.herokuapp.com/",
			allBrandsUrl = "http://80.249.84.47:11000/api/cars/brands/",
			allTenantsUrl = "http://80.249.84.47:11000/api/tenants/";

		// async function fetchUserData() {
		// 	const response = await fetch(allTenantsUrl);
		// 	setTenants(await response.json());
		// }
		// fetchUserData();
		fetch(allBrandsUrl)
			.then(res => res.json())
			.then(
				(result) => {
					// console.log(result);
					setBrands(result);
				},
				(error) => {
					console.log(error);
				}
			);

		fetch(allTenantsUrl)
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result);
					setTenants(result);
				},
				(error) => {
					console.log(error);
				}
			)
	}, []);

	function handleCarNumberInput(event) {
		let result = event.target.value.match(`^[0-9]{4} [A-Z]{2}-[0-9]{1}$`) ||
			event.target.value.match(`^[A-Z]{2} [0-9]{4}-[0-9]{1}$`);
		result ? setInvalidFlagCarNumber(true) : setInvalidFlagCarNumber(false);
		console.log(result);
	}

	function submitForm() {

	}

	return (
		<div className="car-form">
			<ExpansionPanel>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon/>}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className="text">Expansion Panel 1</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="form-wrapper">
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
						sit amet blandit leo lobortis eget.
					</Typography>
					<form>
						<Box className="form-wrapper">
							<FormControl error={!invalidFlagCarNumber}>
								<InputLabel htmlFor="car-input">Car number</InputLabel>
								<Input
									id="car-input"
									aria-describedby="my-helper-text"
									onBlur={handleCarNumberInput}/>
								<FormHelperText id="my-helper-text">Template.</FormHelperText>
							</FormControl>
							<FormControl>
								<InputLabel id="car-brand-label">Car Brand</InputLabel>
								<Select
									labelId="car-brand-label"
									id="car-brand-select"
									value={selectBrand}
									onChange={handleBrandSelect}
								>
									{brands.map((item) => {
										return (
											<MenuItem value={item.id}>{item.name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
							<FormControl disabled={cars.length <= 0}>
								<InputLabel id="car-brand-label">Car Model</InputLabel>
								<Select
									labelId="car-brand-label"
									id="car-brand-select"
									// value={age}
									// onChange={handleChange}
								>
									{cars.map((item) => {
										return (
											<MenuItem value={item.id}>{item.name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
							<FormControl>
								<InputLabel id="car-brand-label">Tenant</InputLabel>
								<Select
									labelId="car-brand-label"
									id="car-brand-select"
									// value={age}
									// onChange={handleChange}
								>
									{tenants.map((item) => {
										return (
											<MenuItem value={item.id}>{item.name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						</Box>
						<Button
							variant="contained"
							onClick={submitForm}
						>
							Submit
						</Button>
					</form>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
};

export default NewCarForm;
