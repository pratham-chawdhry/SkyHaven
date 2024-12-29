import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, MenuItem, Select } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Plane } from 'lucide-react';
import { UserCog } from 'lucide-react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('USER_ROLE');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <Plane className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">SkyBooker</span>
        </Link>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <div className="flex flex-col items-center">
              <UserPlus className="h-12 w-12 text-blue-600 mb-4" />
              <h1 className="text-2xl font-bold mb-8">Create your account</h1>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
            <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                <InputLabel htmlFor="fullName">Name</InputLabel>
                <OutlinedInput
                  id="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  type="name"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  type="email"
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Account Type</InputLabel>
                <Select
                  value={accountType}
                  label="Account Type"
                  onChange={(e) => setAccountType(e.target.value)}
                  startAdornment={<UserCog  className="w-4 h-4 mr-2" />}
                >
                    <MenuItem key={1} value={"USER_ROLE"}>
                      Travellor
                    </MenuItem>
                    <MenuItem key={2} value={"USER_AIRLINE"}>
                      Airline Administrator
                    </MenuItem>
                    <MenuItem key={3} value={"USER_ADMIN"}>
                      Admin
                    </MenuItem>
                </Select>
              </FormControl>

              <button className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-[1.02] duration-200 shadow-lg hover:shadow-xl mt-4">
                Sign Up
              </button>

              <p className="mt-4 text-center">
                Already have an account?{' '}
                <Link to="/auth/signin" className="text-blue-600 hover:text-blue-700">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
