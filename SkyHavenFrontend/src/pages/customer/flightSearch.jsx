import React, { useState } from 'react';
import { SearchBar } from '../../components/SearchBar';
import { FlightList } from '../../components/FlightList';

const sampleFlights = [
    {
        "id": 1,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 2,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 52,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 102,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 152,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 202,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 252,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 302,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 352,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 402,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 452,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 1,
            "airportName": "Hartsfield–Jackson Atlanta International Airport",
            "city": "Atlanta",
            "state": "Georgia",
            "country": "USA",
            "iataCode": "ATL",
            "timezone": "America/New_York",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 1,
                    "terminalName": "Domestic Terminal"
                },
                {
                    "terminalId": 2,
                    "terminalName": "Maynard H. Jackson Jr. International Terminal"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 45,
            "airportName": "Munich Airport",
            "city": "Munich",
            "state": "",
            "country": "Germany",
            "iataCode": "MUC",
            "timezone": "Europe/Berlin",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 125,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 126,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    },
    {
        "id": 502,
        "firstClassPrice": null,
        "businessClassPrice": null,
        "economyClassPrice": null,
        "premiumEconomyClassPrice": null,
        "flightNumber": "BA747",
        "aircraftModel": null,
        "arrivalTime": "2025-03-15T18:49:14.48992",
        "departureTime": "2025-03-15T12:49:14.48992",
        "terminalArrival": null,
        "airportArrival": {
            "airport_id": 9,
            "airportName": "Charles de Gaulle Airport",
            "city": "Paris",
            "state": "",
            "country": "France",
            "iataCode": "CDG",
            "timezone": "Europe/Paris",
            "dst": "Y",
            "terminals": [
                {
                    "terminalId": 31,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 32,
                    "terminalName": "Terminal 2 (2A to 2G)"
                },
                {
                    "terminalId": 33,
                    "terminalName": "Terminal 3"
                }
            ]
        },
        "terminalDeparture": null,
        "airportDeparture": {
            "airport_id": 26,
            "airportName": "Shanghai Hongqiao International Airport",
            "city": "Shanghai",
            "state": "",
            "country": "China",
            "iataCode": "SHA",
            "timezone": "Asia/Shanghai",
            "dst": "N",
            "terminals": [
                {
                    "terminalId": 70,
                    "terminalName": "Terminal 1"
                },
                {
                    "terminalId": 71,
                    "terminalName": "Terminal 2"
                }
            ]
        },
        "airlineName": "United Airlines"
    }
];

function App() {
  const [flights, setFlights] = useState(sampleFlights);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (searchData) => {
    console.log('Search performed:', searchData);
    setSearchPerformed(true);
    // Real implementation would filter flights based on searchData
  };

  const handleUpdateFlight = (updatedFlight) => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) =>
        flight.id === updatedFlight.id ? updatedFlight : flight
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar onSearch={handleSearch} />

      {searchPerformed ? (
        <FlightList flights={flights} onUpdateFlight={handleUpdateFlight} />
      ) : (
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="text-8xl mb-6">✈️</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Take Off?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Search for flights to discover amazing destinations worldwide
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Destinations</h3>
                <p className="text-gray-600">Explore flights to destinations across the globe</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
                <p className="text-gray-600">Find the most competitive flight prices available</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Booking</h3>
                <p className="text-gray-600">Quick and secure flight booking process</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;