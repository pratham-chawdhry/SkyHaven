const fetch = require('node-fetch');  
const fs = require('fs');  

let environment = "http://localhost:8080";

let object = {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    addAircraftModel: "/add/aircraftmodel",
    airlineCabin: "/airlinecabins/add",
    airline: "/addAirline",
    airport: "/addairports",
    flights: "/addflights",
    terminal: "/addterminals",
};

async function headerCreator(token) {
    let header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }

    return header;
}

const users= require('../JSONs/sign_in.json');
const aircraft_models = require('../JSONs/aircraft_models.json');
const airlines = require('../JSONs/airlines.json');
const airports = require('../JSONs/airports.json');
const flights = require('../JSONs/flight_requests.json');
const terminals = require('../JSONs/complete_terminals.json');
const airline_cabins = require('../JSONs/airline_cabins.json');

let signUpUrl = `${environment}${object.signUp}`;
let signInUrl = `${environment}${object.signIn}`;
let aircraftUrl = `${environment}${object.addAircraftModel}`;
let airlineUrl = `${environment}${object.airline}`;
let airportUrl = `${environment}${object.airport}`;
let flightUrl = `${environment}${object.flights}`;
let terminalUrl = `${environment}${object.terminal}`;
let airlineCabinUrl = `${environment}${object.airlineCabin}`;

async function signUp(url, header, data) {
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

async function signIn(url, header, data) {
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

async function processSignUpsSignIns(signUpUrl, signInUrl, header, users) {
    for (let i = 0; i < users.length; i++) {
        try {
            let signUpResponse = await signUp(signUpUrl, header, users[i]);
            if (signUpResponse.token) {
                token.push(
                    {
                        "username": users[i].email,
                        "token": signUpResponse.token
                    }
                )
            }
        } catch (error) {
            console.log("Sign-up failed with status: " + error.status);
            try {
                let signInResponse = await signIn(signInUrl, header, users[i]);
                if (signInResponse.token) {
                    token.push(
                        {
                            "username": users[i].email,
                            "token": signInResponse.token
                        }
                    )
                }
            } catch (signInError) {
                console.log("Sign-in failed with status: " + signInError.status);
            }
        }
    }
}

async function processPostRequests(url, header, data) {
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

async function processAircraftModels(url, token, aircraft_models) {
    for (let i = 0; i < aircraft_models.length; i++) {
        try {
            let aircraftModelResponse = await processPostRequests(url, header, aircraft_models[i]);
        }
        catch (error) {
        }
    }
}

async function processAirlines(url, header, airlines) {
    for (let i = 0; i < airlines.length; i++) {
        try {
            let airlineResponse = await processPostRequests(url, header, airlines[i]);
        }
        catch (error) {
        }
    }
}

async function processAirports(url, header, airports) {
    await processPostRequests(url, header, airports);
}

async function processTerminals(url, header, terminals) {
    await processPostRequests(url, header, terminals);
}

async function processAirlineCabins(url, header, airline_cabins) {
    for (let i = 0; i < airline_cabins.airlines.length; i++) {
        try {
            let userName = 2 * i + 1;
            let tokenUser = token[userName].token;

            // console.log(token[userName]);
            header = await headerCreator(tokenUser);
            let airlineCabinResponse = await processPostRequests(url, header, airline_cabins.airlines[i].cabins);
        }
        catch (error) {
        }
    }
}

let token = [];
let adminArray = [];
let userArray = [];
let header;

async function split(users){
    for (let i = 0; i < users.length; i++) {
        if (users[i].role === "ROLE_ADMIN") {
            adminArray.push(users[i]);
        }
        else {
            userArray.push(users[i]);
        }
    }
}


async function processFlightRequests(url, header, flights){
    for (let i = 1; i < token.length; i++) {
        try {
            let userName = i;
            let tokenUser = token[userName].token;

            let flightsArray = flights.slice((i - 1) * 500, i * 500);

            header = await headerCreator(tokenUser);
            let airlineCabinResponse = await processPostRequests(url, header, flightsArray);
        }
        catch (error) {
        }
    }
}


async function main() {
    console.log(users);
    let userHeader = {
        "Content-Type": "application/json",
    }

    await split(users);
    await processSignUpsSignIns(signUpUrl, signInUrl, userHeader, adminArray);
    header = await headerCreator(token[0].token);
    await processAircraftModels(aircraftUrl, header, aircraft_models);
    await processAirlines(airlineUrl, header, airlines);
    await processAirports(airportUrl, header, airports);
    await processTerminals(terminalUrl, header, terminals);

    await processSignUpsSignIns(signUpUrl, signInUrl, userHeader, userArray);

    console.log(token);
    await processAirlineCabins(airlineCabinUrl, token, airline_cabins);

    // console.log(flights);
    await processFlightRequests(flightUrl, token, flights);
}

main().catch((error) => console.error('Error:', error));