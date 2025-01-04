import React, { useState } from "react";
import Checkbox from "../../components/Checkbox";
import { Plus, Trash2 } from "lucide-react";
import { set } from "date-fns";
import SeatingForm from "../../components/SeatingForm";
import Seat from "../../components/Seat";
import Modal from "../../components/Modal";
import { Sofa } from 'lucide-react';
import { Plane } from 'lucide-react';
import "./Table.css";
import timezones from "../JSONs/timezones.json";
import Select from "react-select";
import countries from "../JSONs/countries.json"

const options = timezones.map((timezone) => ({
    value: timezone.zone,
    label: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="text-gray-700" style={{fontStyle : "italic", fontSize: "12px"}}>{timezone.zone}</span>
        <span style={{ fontSize: "8px" }}>{timezone.gmt}</span>
      </div>
    ),
}));

const countryOptions = countries.map((country) => ({
    value: country.name,
    label: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="text-gray-700" style={{fontStyle : "italic", fontSize: "12px"}}>{country.name}</span>
        <span style={{ fontSize: "10px" }}>{country.code}</span>
      </div>
    ),
}));


const terminal = [
    {
        "terminalName": null,
    },
]

function addAirport() {
    const [country, setCountry] = useState("");

    const formDetails = [
        {
            "attributeName": "Airport Name",
            "attributeType": "text",
            "attributeId": 1,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": null,
        },
        {
            "attributeName": "Country",
            "attributeType": "text",
            "attributeId": 2,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": (onChange) => {
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                    <Select
                        options={countryOptions}
                        className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => {
                            onChange(e.value);
                            setCountry(e.value);
                        }}
                    />
                    </div>
                );
            }
        },
        {
            "attributeName": "State",
            "attributeType": "text",
            "attributeId": 3,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": null,
        },
        {
            "attributeName": "City",
            "attributeType": "text",
            "attributeId": 4,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": (onChange) => {
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                    <Select
                        options={options}
                        className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => onChange(e.value)}
                    />
                    </div>
                );
            }
        },
        {
            "attributeName": "IATA Code",
            "attributeType": "text",
            "attributeId": 5,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": null,
        },
        {
            "attributeName": "Time Zone",
            "attributeType": "dropdown",
            "attributeId": 6,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": (onChange) => {
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                    <Select
                        options={options}
                        className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => {onChange(e.value)}} // Pass the value of the selected option
                    />
                    </div>
                );
            },
        },
        {
            "attributeName": "DST",
            "attributeType": "radio",
            "attributeId": 7,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": (onChange) => {
                return (
                  <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <input type="radio" name="dst" value="Y" id="dstY" required={true} className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => onChange(e.target.value)}
                      />
                      <label htmlFor="dstY" className="inline-flex items-center py-2 text-sm font-medium text-gray-700">
                        Yes
                      </label>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <input type="radio" name="dst" value="N" id="dstN"required={true} className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => onChange(e.target.value)}
                      />
                      <label htmlFor="dstN" className="inline-flex items-center py-2 text-sm font-medium text-gray-700">
                        No
                      </label>
                    </div>
                  </div>
                )
            }
        },
    ]


    const [addAirport, setAddAirport] = useState(true);
    const [form, setForm] = useState(formDetails);
    const [terminals, setTerminals] = useState(terminal);

    const addNewAirport = () => {
        terminals.filter((terminal) => terminal.terminalName === "");
        let airport = {
            airportName: null,
            city: null,
            state: null,
            country: country,
            iataCode: null,
            timezone: null,
            dst: null,
            terminals: []
        }

        console.log(terminals);

        terminals.map((terminalObj) => {
            if (terminalObj.terminalName) {
                airport.terminals.push(terminalObj);
            }
        });

        form.map((attribute) => {
            if (attribute.attributeId === 1) {
                airport.airportName = attribute.attributeValue;
            }
            else if (attribute.attributeId === 4) {
                airport.city = attribute.attributeValue;
            }
            else if (attribute.attributeId === 3) {
                airport.state = attribute.attributeValue;
            }
            else if (attribute.attributeId === 5) {
                airport.iataCode = attribute.attributeValue;
            }
            else if (attribute.attributeId === 6) {
                airport.timezone = attribute.attributeValue;
            }
            else if (attribute.attributeId === 7) {
                airport.dst = attribute.attributeValue;
            }
        });
        console.log(airport);
    }

    const handleInputChange = (id, value) => {
        setForm((prevDetails) =>
          prevDetails.map((detail) =>
            detail.attributeId === id
              ? { ...detail, attributeValue: value } // Update the attributeValue
              : detail
            )
        );
    };

    const setAttributeValue = (attributeId, value) => {
        console.log(form);
        setForm((prevForm) => {
            const updatedForm = prevForm.map((form) => {
                if (form.attributeId === attributeId) {
                    return{ ...form, attributeValue: value };
                }
                return form;
            });

            return updatedForm;
        });
    };
    
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                className="mt-3">
            <div className="flex justify-between items-center" style={{
                paddingTop: "30px",
                paddingBottom: "30px",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
                width: "90%",
            }}>
                <div className="flex flex-col">
                    <div className="flex gap-4 items-center">
                        <div>
                            <Plane style={{color: "#777777"}} width={25} height={25}/>
                        </div>
                        <div style={{color: "#1B273A", fontSize: "28px", fontWeight: 700, lineHeight: "28.8px", textAlign: "left", textUnderlinePosition: "from-font", textDecorationSkipInk: "none"}}>
                            {addAirport ? "Add Airport" : "Edit Airport"}
                        </div>
                    </div>
                    <div style={{
                        color: "#777777", fontSize: "14px", fontWeight: 400,
                        lineHeight: "16.8px", textAlign: "left", textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none", marginTop: "5px"
                    }}>
                        {addAirport ? "Add a new airport to the database" : "Edit an existing airport in the database"}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
                    <div>
                        <button onClick={(e) => addNewAirport()} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{width: "90%", display: "flex"}}>
                <div style={{width: "80%"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div>
                            <label
                                htmlFor="dropdown"
                                className="inline-flex items-center py-2 text-sm font-medium text-gray-700"
                            >
                                Terminal
                            </label>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                            <div style={{fontStyle: "italic", fontSize: "12px"}}>Add Terminal: {" "}</div>
                            <div>
                                <button
                                    className="bg-blue-500 py-2 px-2 rounded-lg text-lg font-semibol transition-colors transform hover:scale-[1.02] duration-200 shadow-lg hover:shadow-xl"
                                    onClick = {() => {
                                        console.log(terminals);
                                        setTerminals((prevTerminals) => [
                                            ...prevTerminals,
                                            {
                                                terminalName: null,
                                            }
                                        ]);
                                    }}
                                    >
                                    <Plus
                                        className="w-4 h-4 border-1px"
                                        style={{ color: "white" }}
                                    /> 
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{
                            overflowX: "auto",
                            overflowY: "auto",
                            border: "2px solid #E2E2E2",
                            height: "300px",
                            marginTop: "5px",
                        }}
                        className="bg-white shadow-md rounded-lg mb-10">
                        <table style={{
                            backgroundColor: "white",
                            whiteSpace: "nowrap"
                        }}>
                            <thead>
                                <tr style={{fontStyle: "italic"}}>
                                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Terminal Name</th>
                                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    terminals.map((terminalObj, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 text-left" style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <input
                                                type="text"
                                                id="terminalName"
                                                name="terminalName"
                                                className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                onChange={(e) => {
                                                console.log(e.target.value);
                                                setTerminals((prevTerminals) => {
                                                    console.log(prevTerminals);
                                                    return prevTerminals.map((obj, terminalIndex) => {
                                                    if (terminalIndex === index) {
                                                        console.log("Updated value:", e.target.value);
                                                        return { ...obj, terminalName: e.target.value };
                                                    }
                                                    return obj;
                                                    });
                                                });
                                                }}
                                                />
                                            </td>
                                            <td className="text-center">
                                                {index !== 0 && <button
                                                className="bg-red-500 py-2 px-2 rounded-lg text-lg font-semibol transition-colors transform hover:scale-[1.02] duration-200 shadow-lg hover:shadow-xl"
                                                onClick={() => {
                                                    setTerminals((prevTerminals) => {
                                                        const updatedTerminals = prevTerminals.filter((terminal, terminalIndex) => {
                                                            return terminalIndex !== index;
                                                        });

                                                        console.log(updatedTerminals);
                                                        return updatedTerminals;
                                                    });
                                                }}
                                                >
                                                <Trash2
                                                    className="w-4 h-4 border-1px"
                                                    style={{ color: "white" }}
                                                />
                                                </button>}
                                            </td>
                                        </tr>
                                    ))
                                } 
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="ml-10" style={{width: "120%"}}>
                    <div style={{ display: "flex", alignItems: "center", gap: "30px", flexWrap: "wrap" }}>
                        {
                            form.map((attribute, index) => {
                                return (
                                    <div key={index}>
                                        <label
                                            htmlFor="dropdown"
                                            className="inline-flex items-center py-2 text-sm font-medium text-gray-700"
                                        >
                                            {attribute.attributeName}
                                        </label>
                                        {attribute.renderInput ? attribute.renderInput((value) =>{
                                            handleInputChange(attribute.attributeId, value);
                                            console.log(form);
                                        }
                                        ) : (<input
                                            type={attribute.attributeType} 
                                            id={attribute.attributeId} 
                                            name={attribute.attributeName} 
                                            value={attribute.attributeValue} 
                                            required={attribute.attributeRequired} 
                                            className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            onChange={(e) => setAttributeValue(attribute.attributeId, e.target.value)}
                                        />)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default addAirport
