import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Airlines from './pages/tables/Airlines';
import Flights from './pages/tables/Flights'
import Airports from './pages/tables/Airports'
import AddAirplaneConfigurations from './pages/add/addAirplaneConfigurations'
import AirplaneConfigurations from './pages/tables/AirplaneConfigurations'
import AddAirport from './pages/add/addAirport'
import AddAirline from './pages/add/addAirline'
import Users from './pages/tables/Users'
import Seats from './pages/tables/Seats'
import EditAirport from './pages/add/addAirport'
import EditAirline from './pages/add/addAirline'
import EditAirplaneConfigurations from './pages/add/addAirplaneConfigurations'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />  
              <Route path="/airlines/table" element={<Airlines />} />
              <Route path="/flights/table" element={<Flights />} />
              <Route path="/airports/table" element={<Airports />} />
              <Route path="/seats/table" element={<Seats />} />
              <Route path="/users/table" element={<Users />} />
              <Route path="/airplaneConfigurations/table" element={<AirplaneConfigurations />} />
              <Route path="/airplaneConfigurations/add" element={<AddAirplaneConfigurations />} />
              <Route path="/airports/add" element={<AddAirport />} />
              <Route path="/airlines/add" element={<AddAirline />} />
              <Route path="/airports/edit" element={<EditAirport />} />
              <Route path="/airlines/edit" element={<EditAirline />} />
              <Route path="/airplaneConfigurations/edit" element={<EditAirplaneConfigurations />} />
            </Routes>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

// Done:
// - Add Airplane Configurations
// - Add Airports
// - Add Airlines
// - Add Users
// - Edit Airports
// - Edit Airlines

// To be Done
// - Add Flights
// - Edit Airplane Configurations
// - Edit Flights

export default App;
