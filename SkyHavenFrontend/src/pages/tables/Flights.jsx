import React from 'react'
import Table from '../../components/Table'
import flights from '../JSONs/flights.json'

const columnName = [
    {
        "name" : "Flight Number",
        "displayName" : "FlightNumber",
        "attribute" : "flightNumber",
        "rowStyle" : {
            whiteSpace: "nowrap",
            fontWeight: 500,
            color : "#036FE3",
        },
        "rowClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
        "titleClassName" : ""
    },
    {
        "name" : "Airline Name",
        "displayName" : "Airline Name",
        "display" : true,
        "attribute" : "airline.airlineName",
        "rowStyle" : {
            display: "inline-block",
            backgroundColor: "#E8F5FF",
            whiteSpace: "nowrap",
            color : "#036FE3",
            fontWeight: 600,
            padding: "4px 8px 4px 8px",
            borderRadius: "24px",
        },
        "rowClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
        "titleClassName" : ""
    },
    {
        "name" : "Airline Code",
        "displayName" : "Airline Code",
        "display" : true,
        "attribute" : "airline.airlineCode",
        "rowStyle" : {
            display: "inline-block",
            backgroundColor: "#CEFFED",
            whiteSpace: "nowrap",
            color : "#15845C",
            fontWeight: 600,
            padding: "4px 8px 4px 8px",
            borderRadius: "6px",
        },
        "rowClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
    },
    {
        "name" : "Arrival",
        "displayName" : "Arrival",
        "display" : true,
        "attribute" : "airportArrival.airportName",
        "rowStyle" : {
            whiteSpace: "nowrap",
        },
        "rowClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
    },
    {
        "name" : "Departure",
        "displayName" : "Departure",
        "display" : true,
        "attribute" : "airportDeparture.airportName",
        "rowStyle" : {
            whiteSpace: "nowrap",
        },
        "rowClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
    }
]


export default function Flights() {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* <Table data={flights} columnName={columnName} /> */}
    </div>
  )
}
