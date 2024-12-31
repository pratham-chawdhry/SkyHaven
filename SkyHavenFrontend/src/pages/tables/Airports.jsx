import Table from '../../components/Table'
import { borderRadius, display, fontWeight, padding, textAlign } from '@mui/system'
import airports from "../JSONs/airports.json"
import Pagination from '../../components/Pagination'
import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { TowerControl } from 'lucide-react';
import { Trash2 } from 'lucide-react';

const terminalContent = (row) => {
    const generateAddress = (row) => {
        const attributes = ["city", "state", "country"];
        const address = attributes
            .map(attr => row[attr])
            .filter(value => value !== null && value !== undefined && value.trim() !== "")
            .join(", ");
        return address || "N/A"; 
    }

    const urlConstructor = (row) => {
        const airportName = row.airportName.replaceAll(" ", "+");
        const url = `https://www.google.com/maps/search/?api=1&query=${airportName}+${row.city}+${row.state}+${row.country}`;
        return url;
    }

    let url = urlConstructor(row);

    return (
        <div>
            <div className = "shadow-md" style = {{
                borderRadius: "8px",
                padding : "20px",
            }}>
                <div style = {{
                    paddng : "20px",
                    display: "inline-block",
                    backgroundColor: "#ede0ff",
                    whiteSpace: "nowrap",
                    color: "#742be2",
                    fontWeight: 600,
                    padding: "12px 20px",
                    borderRadius: "40px",
                }}>
                    <div className='flex items-center gap-5'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tickets-plane"><path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12"/><path d="m12 13.5 3.75.5"/><path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8"/><path d="M6 10V8"/><path d="M6 14v1"/><path d="M6 19v2"/><rect x="2" y="8" width="20" height="13" rx="2"/></svg>
                        </div>
                        <div style = {{fontWeight: 600, fontSize: "60px", lineHeight: "20px"}}>
                            {row.iataCode}
                        </div>
                    </div>
                </div>
                <div className='mt-2' style = {{
                    display: "inline-block",
                    // backgroundColor: "#E8F5FF",
                    whiteSpace: "nowrap",
                    // color : "#036FE3",
                    // fontWeight: 600,
                    padding: "6px 10px",
                    color : "#5F5F5F",
                    fontStyle: "italic",
                    fontSize: "18px",
                    // borderRadius: "24px",
                }}>
                    {row.airportName}
                </div>
                <div className='mt-2 flex gap-2' onClick = {(e) => open(url)} style={{ cursor: "pointer", textDecoration: "underline", color: "#036FE3", textUnderlineOffset: "2px"}}>
                    <div>
                        <svg style={{color: "#036FE3"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-house"><path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"/><path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"/><path d="M18 22v-3"/><circle cx="10" cy="10" r="3"/></svg>
                    </div>
                    <div style={{color: "#036FE3", fontWeight: 500}}>
                        {generateAddress(row)}
                    </div>
                </div>
            </div>
            <div style={{
                overflowY: "auto",
                height: "300px",
            }}>
                {
                    row.terminals.map((terminal) => (
                        <div className = "flex items-center justify-between" style = {{
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "1px solid #CFD9E0",
                            padding: "10px 20px",
                            gap: "10px",
                        }}>
                            <div className='flex items-center gap-2'>
                                <div style = {{

                                }}>
                                    <TowerControl style = {{
                                        width: "40px",
                                        height: "40px",
                                    }}
                                    strokeWidth={1.2}/>
                                </div>
                                <div>
                                    <div style = {{
                                    color : "#67728A", 
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    }}>
                                        {terminal.terminalName}
                                    </div>
                                    <div style = {{
                                    color : "#67728A", 
                                    fontWeight: 500,
                                    fontSize: "10px",
                                    }}>
                                        {row.airportName}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    style={{
                                        backgroundColor: "red",
                                        padding: "4px 4px",
                                        color: "white",
                                        borderRadius: "6px",
                                    }}>
                                    <Trash2 className='w-4 h-4'/>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const columnName = [
    {
        "name" : "Aiport Id",
        "displayName" : "Airport Id",
        "display" : true,
        "attributes" : [{
            "name" : "iataCode",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {
            display: "inline-block",
            backgroundColor: "#ede0ff",
            whiteSpace: "nowrap",
            color: "#742be2",
            fontWeight: 600,
            padding: "6px 10px",
            borderRadius: "12px",
        },
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "",
        "renderCell" : (row) => {
            const attributes = ["iataCode"];
            const address = attributes
                .map(attr => row[attr])

            return (
                <div className = "flex items-center gap-2">
                    {address || "N/A"}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tickets-plane"><path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12"/><path d="m12 13.5 3.75.5"/><path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8"/><path d="M6 10V8"/><path d="M6 14v1"/><path d="M6 19v2"/><rect x="2" y="8" width="20" height="13" rx="2"/></svg>
                </div>
            )
        }
    },
    {
        "name" : "Airport Name",
        "displayName" : "Airport Name",
        "display" : true,
        "attributes" : [{
            "name" : "airportName",
            "attributeStyles" : {
                display: "inline-block",
                backgroundColor: "#E8F5FF",
                whiteSpace: "nowrap",
                color : "#036FE3",
                fontWeight: 600,
                padding: "6px 10px",
                borderRadius: "24px",
            },
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {
            display : "flex",
            justifyContent : "center", // Horizontal alignment
            alignItems : "center",    // Vertical alignment
            gap : "8px"               // Consistent spacing
        },
        "cellClassName" : "",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
        "titleClassName" : "text-center",
        "renderCell" : null
    },
    {
        "name" : "Address",
        "displayName" : "Address",
        "display" : true,
        "attributes" : [{
            "name" : "city",
            "attributeStyles" : {
                whiteSpace: "nowrap",
            },
            "attributeClassName" : "text-center",
        },
        {
            "name" : "state",
            "attributeStyles" : {
                whiteSpace: "nowrap",
            },
            "attributeClassName" : "text-center",
        },
        {
            "name" : "country",
            "attributeStyles" : {
                whiteSpace: "nowrap",
            },
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {
            display : "flex",
            justifyContent : "center", 
            alignItems : "center",                 
        },
        "cellClassName" : "",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
        "titleClassName" : "text-center",
        "renderCell": (row) => {
            const attributes = ["city", "state", "country"];
            const address = attributes
                .map(attr => row[attr])
                .filter(value => value !== null && value !== undefined && value.trim() !== "")
                .join(", ");
            return address || "N/A"; 
        }
    },
    {
        "name" : "Time Zone",
        "displayName" : "Time Zone",
        "display" : true,
        "attributes" : [{
            "name" : "timezone",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {},
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "",
        "renderCell" : null
    },
    {
        "name" : "DST",
        "displayName" : "DST",
        "display" : true,
        "attributes" : [{
            "name" : "timezone",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {
        },
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "",
        "renderCell" : (row) => {

            return (
                <div className = "flex items-center gap-2 justify-center">
                    {
                        row.dst === "Y" ?
                        <div style = {{display: "inline-block",
                            backgroundColor: "#CEFFED",
                            whiteSpace: "nowrap",
                            color : "#15845C",
                            fontWeight: 600,
                            padding: "4px 8px 4px 8px",
                            borderRadius: "24px"}}>
                            Daylight Saving Time
                        </div>
                        :
                        <div style = {{display: "inline-block",
                            backgroundColor: "#F7F9FA",
                            whiteSpace: "nowrap",
                            color : "#67728A",
                            fontWeight: 600,
                            padding: "4px 8px 4px 8px",
                            borderRadius: "24px"}}>
                            No Daylight Saving Time
                        </div>
                    }
                </div>
            )
        }
    },
    {
        "name" : "Terminal",
        "displayName" : "Terminal",
        "display" : true,
        "attributes" : [{
            "name" : "",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {},
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "",
        "renderCell" : (row) => {
            let content = terminalContent(row);
            return (
                <Modal content={content} />
            )
        }
    },
]

export default function Airports() {
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10; 

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    const totalPages = Math.ceil(airports.length / rowsPerPage);
  
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        className="mt-10"
      >
        <Table
          data={airports}
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
