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
import Seats from './components/Seat'
import AddFlights from './pages/add/addFlightFormat'

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
              <Route path="/seats" element={<Seats />} />
              <Route path="/flights/add" element={<AddFlights />} />
            </Routes>
          </div>
          {/* <Footer/> */}
        </div>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
