import React, {useState} from 'react';
import './App.css';
import Table from "./components/table";
import NewCarForm from "./components/newCarForm";
import { Box, Button } from "@material-ui/core";
import SimpleList from "./components/listOfBrands";

function App() {
    const [isBrandsOpen, setIsBrandOpen] = useState(false);
    const handleBrandsTab = () => {
        setIsBrandOpen(!isBrandsOpen);
        console.log(isBrandsOpen);
    };
    return (
    <div className="App container">
        <Box className="header-wrapper">
            <NewCarForm/>
            <div className="button">
                <Button
                    variant="contained"
                    onClick={handleBrandsTab}
                >
                    Show car brands
                </Button>
            </div>
        </Box>
      <Table/>
      <SimpleList/>
    </div>
  );
}

export default App;
