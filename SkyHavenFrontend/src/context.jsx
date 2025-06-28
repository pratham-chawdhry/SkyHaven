import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import { add } from "date-fns";

const AppContext = React.createContext();

const object = {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    getUsers : "/user/users",
    getAirlines : "/getAirlines",
    deleteAirline : "/deleteAirline",
    getAirplaneConfigurations : "/cabinclasslists/get",
    deleteAirplaneConfiguration : "/cabinclasslist/delete",
    getAirports : "/getairports",
    deleteAirport : "/deleteairport",
    getFlight : "/getflight",
    getFlights : "/getflights",
    deleteFlight : "/deleteflight",
    deleteTerminal : "/deleteterminal",
    addAirplaneConfigurations : "/cabinclasslist/add",
    airport : "/addairport",
    getAirport : "/getairport",
    updateAirport : "/updateairport",
    getAirline : "/getAirline",
    addAirline : "/addAirline",
    updateAirline : "/updateAirline",
    updateAirplaneConfiguration : "/cabinclasslist/update",
    getAirplaneConfiguration : "/cabinclasslist/get",
}

const loginSignUpHeader = {
    "Content-Type": "application/json",
}

let environment = "http://localhost:8080";

const AppProvider = ({ children }) => {

    const [jwt, setjwt] = useState(
      localStorage.getItem("jwt") || ""
    );

    const [role, setRole] = useState(
        localStorage.getItem("role") || ""
    );

    let signInUrl = `${environment}${object.signIn}`;
    let signUpUrl = `${environment}${object.signUp}`;
    let getUsersUrl = `${environment}${object.getUsers}`;
    let getAirlinesUrl = `${environment}${object.getAirlines}`;
    let deleteAirlineUrl = `${environment}${object.deleteAirline}`;
    let getAirplaneConfigurationsUrl = `${environment}${object.getAirplaneConfigurations}`
    let deleteAirplaneConfigurationUrl = `${environment}${object.deleteAirplaneConfiguration}`
    let getAirportsUrl = `${environment}${object.getAirports}`
    let deleteAirportUrl = `${environment}${object.deleteAirport}`

    async function headerCreator(token) {
        let header = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    
        return header;
    }

    async function signUp(data) {
        try {
            let response = await fetch(signUpUrl, {
                method: 'POST',
                headers: loginSignUpHeader,
                body: JSON.stringify(data),
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrer: 'no-referrer',
            });
    
            if (!response.ok) {
                throw new Error(`Sign-up failed with status: ${response.status}`);
            }
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        } catch (error) {
            throw error;
        }
    }

    async function signIn(data) {
        try {
            let response = await fetch(signInUrl, {
                method: 'POST',
                headers: loginSignUpHeader,
                body: JSON.stringify(data),
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrer: 'no-referrer',
            });
    
            if (!response.ok) {
                throw new Error(`Sign-in failed with status: ${response.status}`);
            }
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        } catch (error) {
            throw error;
        }
    }

    async function postRequest(url, header, data) {
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data),
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrer: 'no-referrer',
            });
    
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        }
        catch (error) {
            throw error;
        }
    }

    async function getRequest(url, header) {
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: header,
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrer: 'no-referrer',
            });
    
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        }
        catch (error) {
            throw error;
        }
    }

    async function deleteRequest(url, header, data) {
        try {
            let response = await fetch(url, {
                method: 'DELETE',
                headers: header,
                body: JSON.stringify(data),
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrer: 'no-referrer',
            });
    
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        }
        catch (error) {
            throw error;
        }
    }


    async function putRequest(url, header, data) {
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(data),
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrer: 'no-referrer',
            });
    
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        }
        catch (error) {
            throw error;
        }
    }

    async function getUsers() {
        console.log(jwt);
        let header = await headerCreator(jwt);
        let response = await getRequest(getUsersUrl, header);
        return response;
    }

    async function getAirlines() {
        let header = await headerCreator(jwt);
        let response = await getRequest(getAirlinesUrl, header);
        return response;
    }
    
    async function deleteAirline(id) {
        let header = await headerCreator(jwt);
        let deleteAirlineUrl = `${environment}${object.deleteAirline}/${id}`;
        let response = await deleteRequest(deleteAirlineUrl, header, id);
        return response;
    }

    async function getAirplaneConfigurations() {
        let header = await headerCreator(jwt);
        let response = await getRequest(getAirplaneConfigurationsUrl, header);
        return response;
    }

    async function deleteAirplaneConfiguration(id) {
        let header = await headerCreator(jwt);
        let deleteAirplaneConfigurationUrl = `${environment}${object.deleteAirplaneConfiguration}/${id}`;
        let response = await deleteRequest(deleteAirplaneConfigurationUrl, header, id);
        return response;
    }

    async function getAirports() {
        let header = await headerCreator(jwt);
        let response = await getRequest(getAirportsUrl, header);
        return response;
    }

    async function deleteAirport(id) {
        let header = await headerCreator(jwt);
        let deleteAirportUrl = `${environment}${object.deleteAirport}/${id}`;
        let response = await deleteRequest(deleteAirportUrl, header, id);
        return response;
    }

    async function getFlight(flightId) {
        let header = await headerCreator(jwt);
        let getFlightUrl = `${environment}${object.getFlight}/${flightId}`;
        let response = await getRequest(getFlightUrl, header, flightId);
        return response;
    }

    async function getFlights() {
        let header = await headerCreator(jwt);
        let getFlightsUrl = `${environment}${object.getFlights}`;
        console.log(getFlightsUrl);
        let response = await getRequest(getFlightsUrl, header);
        return response;
    }

    async function deleteTerminal(id) {
        let header = await headerCreator(jwt);
        let deleteTerminalUrl = `${environment}${object.deleteTerminal}/${id}`;
        let response = await deleteRequest(deleteTerminalUrl, header);
        console.log(response);
        return response;
    }

    async function addAirplaneConfigurations(data) {
        let header = await headerCreator(jwt);
        let addAirplaneConfigurationsUrl = `${environment}${object.addAirplaneConfigurations}`;
        let response = await postRequest(addAirplaneConfigurationsUrl, header, data);
        console.log(response);
        return response;
    }

    async function getStates(isoCode) {
        if (!isoCode) {
            throw new Error("ISO country code is required");
        }
    
        const API_KEY = "WnZFbmNiQmN6WkpaWmZJVG42RFlkelQzUXVJbXYxR2huVWFuOHdaUw=="; // Move to server-side for security
        const url = `https://api.countrystatecity.in/v1/countries/${isoCode}/states`;
    
        const requestOptions = {
            method: "GET",
            headers: {
                "X-CSCAPI-KEY": API_KEY
            }
        };
    
        try {
            const response = await fetch(url, requestOptions);
    
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
    
            return await response.json();
        } catch (error) {
            console.error("Error fetching states:", error);
            throw error;
        }
    }    

    async function addAirportFunc(data) {
        let header = await headerCreator(jwt);
        let addAirportUrl = `${environment}${object.airport}`;
        let response = await postRequest(addAirportUrl, header, data);
        return response;
    }

    async function getAirport(id) {
        let header = await headerCreator(jwt);
        let getAirportUrl = `${environment}${object.getAirport}/${id}`;
        let response = await getRequest(getAirportUrl, header);
        return response;
    }

    async function updateAirport(data, id) {
        let header = await headerCreator(jwt);
        let updateAirportUrl = `${environment}${object.updateAirport}/${id}`;
        let response = await putRequest(updateAirportUrl, header, data);
        return response;
    }

    async function getAirline(id) {
        let header = await headerCreator(jwt);
        let getAirlineUrl = `${environment}${object.getAirline}/${id}`;
        let response = await getRequest(getAirlineUrl, header);
        return response;
    }

    async function updateAirline(data, id) {
        let header = await headerCreator(jwt);
        let updateAirlineUrl = `${environment}${object.updateAirline}/${id}`;
        let response = await putRequest(updateAirlineUrl, header, data);
        return response;
    }

    async function addAirline(data, id) {
        let header = await headerCreator(jwt);
        let addAirlineUrl = `${environment}${object.addAirline}`;
        let response = await postRequest(addAirlineUrl, header, data);
        return response;
    }

    async function updateAirplaneConfiguration(data, id) {
        let header = await headerCreator(jwt);
        let updateAirplaneConfigurationUrl = `${environment}${object.updateAirplaneConfiguration}/${id}`;
        let response = await putRequest(updateAirplaneConfigurationUrl, header, data);
        return response;
    }

    async function getAirplaneConfiguration(id) {
        let header = await headerCreator(jwt);
        let getAirplaneConfigurationUrl = `${environment}${object.getAirplaneConfiguration}/${id}`;
        let response = await getRequest(getAirplaneConfigurationUrl, header);
        return response;
    }

    async function getTerminals() {
        return [];
    }

    return (
      <AppContext.Provider value={{ 
        jwt, 
        setjwt,
        role,
        setRole,
        signIn,
        signUp,
        getUsers,
        getAirlines,
        deleteAirline,
        getAirplaneConfigurations,
        deleteAirplaneConfiguration,
        getAirports,
        getFlight,
        getFlights,
        deleteAirport,
        deleteTerminal,
        addAirplaneConfigurations,
        getStates,
        addAirportFunc,
        getAirport,
        updateAirport,
        getAirline,
        updateAirline,
        addAirline,
        updateAirplaneConfiguration,
        getAirplaneConfiguration,
        getTerminals
        }}>
        {children}
      </AppContext.Provider>
    );
}
    
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };