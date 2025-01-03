import Table from '../../components/Table'
import flights from '../JSONs/flights.json'
import Pagination from '../../components/Pagination'
import React, { useState } from 'react';
import { PlaneTakeoff } from 'lucide-react';
import { MoveRight } from 'lucide-react';
import { PlaneLanding } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const getFormattedDate = (isoString) => {
    const date = parseISO(isoString.split('T')[0]);
    const day = format(date, 'd');
    const month = format(date, 'MMMM');
    const year = format(date, 'yyyy');

    const suffix = ['th', 'st', 'nd', 'rd'][(day % 10)] || 'th';
    
    return `${day}${suffix} ${month} ${year}`;
};

const formattedData = (data) => {
    const arrivalDate = getFormattedDate(data.arrivalTime);
    const departureDate = getFormattedDate(data.departureTime);
    
    // Format the arrival and departure times without seconds and in AM/PM format
    const arrivalTime = format(parseISO(data.arrivalTime), 'hh:mm a'); // AM/PM format without seconds
    const departureTime = format(parseISO(data.departureTime), 'hh:mm a'); // AM/PM format without seconds
    
    return {
        arrivalDate,
        arrivalTime,
        departureDate,
        departureTime
    };
};


const columnName = [
    {
        "name": "Flight Number",
        "displayName": "Flight Number",
        "display": true,
        "attributes": [{
            "name": "flightNumber",
            "attributeStyles": {
                display: "inline-block",
                backgroundColor: "#CEFFED",
                whiteSpace: "nowrap",
                color: "#15845C",
                fontWeight: 600,
                padding: "4px 8px",
                borderRadius: "6px"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            display: "inline-block",
        },
        "cellClassName": "text-center",
        "titleStyle": {
            whiteSpace: "nowrap"
        },
        "titleClassName": "",
        "renderCell": null
    },
    {
        "name": "Airline Name",
        "displayName": "Airline Name",
        "display": true,
        "attributes": [{
            "name": "airline.airlineName",
            "attributeStyles": {
                display: "inline-block",
                backgroundColor: "#E8F5FF",
                whiteSpace: "nowrap",
                color: "#036FE3",
                fontWeight: 600,
                padding: "4px 8px",
                borderRadius: "24px"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        "cellClassName": "",
        "titleStyle": {
            whiteSpace: "nowrap"
        },
        "titleClassName": "text-center",
        "renderCell": null
    },
    {
        "name": "Flight itinerary",
        "displayName": "Flight itinerary",
        "display": true,
        "attributes": [{
            "name": "airportArrival.iataCode",
            "attributeStyles": {},
            "attributeClassName": "text-center"
        },
        {
            "name": "airportDeparture.iataCode",
            "attributeStyles": {},
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            display: "inline-block",
            backgroundColor: "#ede0ff",
            whiteSpace: "nowrap",
            color: "#742be2",
            fontWeight: 600,
            padding: "6px 10px",
            borderRadius: "24px",
        },
        "cellClassName": "",
        "titleStyle": {
            whiteSpace: "nowrap"
        },
        "titleClassName": "text-center",
        "renderCell": (row) => {
            const attributes = ["airportArrival.iataCode", "airportDeparture.iataCode"];
            return (
                <div className = "flex items-center gap-2">
                    <PlaneTakeoff strokeWidth={1.7} width ={20} height={20}/>{row.airportDeparture.iataCode}<MoveRight strokeWidth={1.7} width ={20} height={20}/> <PlaneLanding strokeWidth={1.7} width ={20} height={20}/>{row.airportArrival.iataCode} 
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tickets-plane"><path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12"/><path d="m12 13.5 3.75.5"/><path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8"/><path d="M6 10V8"/><path d="M6 14v1"/><path d="M6 19v2"/><rect x="2" y="8" width="20" height="13" rx="2"/></svg>{row.airportArrival.iataCode} <MoveRight strokeWidth={1.5}/> {row.airportDeparture.iataCode} */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tickets-plane"><path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12"/><path d="m12 13.5 3.75.5"/><path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8"/><path d="M6 10V8"/><path d="M6 14v1"/><path d="M6 19v2"/><rect x="2" y="8" width="20" height="13" rx="2"/></svg>{row.airportArrival.iataCode} <ArrowRight strokeWidth={1.5}/> {row.airportDeparture.iataCode} */}
                </div>
            )
        }
    },
    {
        "name": "Departure Time",
        "displayName": "Departure Time",
        "display": true,
        "attributes": [{
            "name": "departureTime",
            "attributeStyles": {},
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            display: "inline-block",
            backgroundColor: "#FFE5CC", // Light orange background
            whiteSpace: "nowrap",
            color: "#FF6700", // Orange text color
            fontWeight: 600,
            padding: "4px 8px",
            borderRadius: "12px"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            whiteSpace: "nowrap"
        },
        "titleClassName": "text-center",
        "renderCell": (row) => {
            let DateTimeObject = formattedData(row);
            let airportDeparture = row.airportDeparture;
            let timeZone = airportDeparture.timezone;
    
            return (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "22px",
                        fontStyle: "italic",
                    }}
                >
                    <div
                        style={{
                            borderRight: "2px solid rgb(255, 103, 0)",
                            textAlign: "right",
                            fontSize: "22px",
                            padding: "10px",
                            paddingLeft: "0px",
                            marginRight: "10px",
                            fontStyle: "italic",
                        }}
                    >
                        {DateTimeObject.departureTime}
                    </div>
                    <div
                        style={{
                            textAlign: "left",
                            fontSize: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: "15px",
                        }}
                    >
                        <div>{timeZone}</div>
                        <div>{DateTimeObject.departureDate}</div>
                    </div>
                </div>
            );
        }
    },    
    {
        "name": "Departure",
        "displayName": "Departure",
        "display": true,
        "attributes": [{
            "name": "airportDeparture.airportName",
            "attributeStyles": {
                whiteSpace: "nowrap"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            whiteSpace: "nowrap"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            whiteSpace: "nowrap"
        },
        "titleClassName": "text-center",
        "renderCell": (row) => {
            const airportName = row.airportDeparture.airportName.replaceAll(" ", "+");

            let string = "";
            const terminalName = row.terminalDeparture?.terminalName;

            const url = `https://www.google.com/maps/search/?api=1&query=${terminalName}+${airportName}`;

            if (!row.terminalDeparture) {
                string = row.airportDeparture.airportName
            }
            else if (row.terminalDeparture && row.terminalDeparture.terminalName) {
                string = row.terminalDeparture.terminalName + ", " + row.airportDeparture.airportName;
            }

            return (
                <div className='mt-2 flex gap-2' onClick = {(e) => open(url)} style={{ cursor: "pointer", textDecoration: "underline", color: "#036FE3", textUnderlineOffset: "2px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div>
                        <svg style={{color: "#036FE3"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin-house"><path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"/><path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"/><path d="M18 22v-3"/><circle cx="10" cy="10" r="3"/></svg>
                    </div>
                    <div style={{color: "#036FE3", fontWeight: 500}}>
                        {string}
                    </div>
                </div>
            )
        }
    },
    {
        "name": "Arrival Time",
        "displayName": "Arrival Time",
        "display": true,
        "attributes": [{
            "name": "arrivalTime",
            "attributeStyles": {},
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            display: "inline-block",
            backgroundColor: "#FFE5CC", // Light orange background
            whiteSpace: "nowrap",
            color: "#FF6700", // Orange text color
            fontWeight: 600,
            padding: "4px 8px",
            borderRadius: "6px"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            whiteSpace: "nowrap"
        },
        "titleClassName": "text-center",
        "renderCell": (row) => {
            let DateTimeObject = formattedData(row)
            let airportArrival = row.airportArrival;
            let timeZone = airportArrival.timezone;
            return(
                <div style = {{display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px"}}>
                    <div style={{borderRight: "2px solid rgb(255, 103, 0)",
                    textAlign: "right",
                    fontSize: "22px",
                    padding: "10px",
                    paddingLeft: "0px",
                    marginRight: "10px",
                    fontStyle : "italic"}}>
                        {DateTimeObject.arrivalTime}
                    </div>
                    <div
                        style={{
                            textAlign: "left",
                            fontSize: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: "15px",
                            fontStyle: "italic",
                        }}
                        >
                        <div>{timeZone}</div>
                        <div>{DateTimeObject.arrivalDate}</div>
                    </div>

                </div>
            )
        }
    },
    {
        "name": "Arrival",
        "displayName": "Arrival",
        "display": true,
        "attributes": [{
            "name" : "terminalArrival.terminalName",
            "attributeStyles": {},
            "attributeClassName": "text-center"
        },
        {
            "name": "airportArrival.airportName",
            "attributeStyles": {
                whiteSpace: "nowrap"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            whiteSpace: "nowrap"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            whiteSpace: "nowrap"
        },
        "titleClassName": "text-center",
        "renderCell": (row) => {
            const airportName = row.airportArrival.airportName.replaceAll(" ", "+");

            let string = "";
            const terminalName = row.terminalArrival?.terminalName;
            let url = "";

            if (row.terminalArrival && row.terminalArrival.terminalName) {
                url = `https://www.google.com/maps/search/?api=1&query=${row.terminalArrival.terminalName}+${airportName}`;
            }
            else{
                url = `https://www.google.com/maps/search/?api=1&query=${airportName}`;
            }

            if (row.terminalArrival && row.terminalArrival.terminalName) {
                string = row.terminalArrival.terminalName + ", " + row.airportArrival.airportName;
            }
            else if (!row.terminalArrival) {
                string = row.airportArrival.airportName
            }

            return (
                <div className='mt-2 flex gap-2' onClick = {(e) => open(url)} style={{ cursor: "pointer", textDecoration: "underline", color: "#036FE3", textUnderlineOffset: "2px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div>
                        <svg style={{color: "#036FE3"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin-house"><path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"/><path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"/><path d="M18 22v-3"/><circle cx="10" cy="10" r="3"/></svg>
                    </div>
                    <div style={{color: "#036FE3", fontWeight: 500}}>
                        {string}
                    </div>
                </div>
            )
        }
    },
];

export default function Flights() {

    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10; 

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    const totalPages = Math.ceil(flights.length / rowsPerPage);
  
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        className="mt-10"
      >
        <Table
          data={flights}
          columnName={columnName}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handlePageChange={handlePageChange}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    );
}
