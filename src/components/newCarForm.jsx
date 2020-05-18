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


const NewCarForm = () => {
	const [brands, setBrands] = useState([]);
	const [cars, setCars] = useState([]);
	const [tenants, setTenants] = useState([]);
	const [selectBrand, setSelectBrand] = useState('');
	const allCarsThisBrand = "http://80.249.84.47:11000/api/cars/brands/";
	const [invalidFlagCarNumber, setInvalidFlagCarNumber] = useState(true);
	const [selectedTenant, setSelectedTenant] = useState('');
	const [selectedModel, setSelectedModel] = useState('');
	const [carNumber, setCarNumber] = useState('');

	const handleBrandSelect = (event) => {
		setSelectBrand(event.target.value);
		getCarsActiveBrand(event.target.value);
	};

	const getCarsActiveBrand = (id) => {
		fetch(allCarsThisBrand + id + "/")
			.then(res => res.json())
			.then(
				(result) => {
					setCars(result);
				},
				(error) => {
					console.log(error);
				}
			);
	};

	const handleSelectedModel = (event) => {
		setSelectedModel(event.target.value);
	};
	const handleSelectedTenant = (event) => {
		setSelectedTenant(event.target.value);
	};

	const submitForm = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"car_number": carNumber, "car_brand": selectBrand, "car_model": selectedModel, "car_tenant": selectedTenant })
		};

		fetch('http://80.249.84.47:11000/api/cars/add/', requestOptions)
			.then(response => response.json())
	};

	useEffect(() => {
		const allBrandsUrl = "http://80.249.84.47:11000/api/cars/brands/",
			allTenantsUrl = "http://80.249.84.47:11000/api/tenants/";

		fetch(allBrandsUrl)
			.then(res => res.json())
			.then(
				(result) => {
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
		if (result) {
			setCarNumber(event.target.value);
		}
	}

	return (
		<div className="car-form">
			<ExpansionPanel>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon/>}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className="text">Add new car</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="form-wrapper">
					<form>
						<Box className="form-wrapper">
							<FormControl error={!invalidFlagCarNumber}>
								<InputLabel htmlFor="car-input">Car number</InputLabel>
								<Input
									id="car-input"
									aria-describedby="my-helper-text"
									onBlur={handleCarNumberInput}/>
								<FormHelperText id="my-helper-text">Only "ZZ-0000-7" and "4547 ZZ-7" cases are valid</FormHelperText>
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
											<MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
							<FormControl disabled={cars.length <= 0}>
								<InputLabel id="car-brand-label">Car Model</InputLabel>
								<Select
									labelId="car-brand-label"
									id="car-brand-select"
									value={selectedModel}
									onChange={handleSelectedModel}
								>
									{cars.map((item) => {
										return (
											<MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
							<FormControl>
								<InputLabel id="car-brand-label">Tenant</InputLabel>
								<Select
									labelId="car-brand-label"
									id="car-brand-select"
									value={selectedTenant}
									onChange={handleSelectedTenant}
								>
									{tenants.map((item) => {
										return (
											<MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						</Box>
						<Box mt={4}>
							<Button
							variant="contained"
							onClick={submitForm}
							className="submit-button"
						>
							Submit
						</Button>
						</Box>
					</form>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
};

export default NewCarForm;
