import React, { useEffect, useState } from "react";
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
import { useGlobalContext } from '../../context';
import { useLocation } from "react-router-dom";

const options = timezones.map((timezone) => ({
    value: timezone.zone,
    gmt : timezone.gmt,
    label: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="text-gray-700" style={{fontStyle : "italic", fontSize: "12px"}}>{timezone.zone}</span>
        <span style={{ fontSize: "8px" }}>{timezone.gmt}</span>
      </div>
    ),
}));

const countryOptions = countries
    .map((country) => ({
        code: country.code,
        value: country.name,
        label: (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="text-gray-700" style={{ fontStyle: "italic", fontSize: "12px" }}>
                    {country.name}
                </span>
                <span style={{ fontSize: "10px" }}>{country.code}</span>
            </div>
        ),
    }))
    .filter((option) => option.value !== "USA" || option.value !== "UAE");

const terminal = [
    {
        "terminalName": null,
    },
]

function addorEditAirport() {
    const [isEditMode, setIsEditMode] = useState(false);
    const location = useLocation();
    let id = null;
    const [airport, setAirport] = useState({});
    const { getAirport, updateAirport } = useGlobalContext();
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(false);
    const [formDetails, setFormDetails] = useState([]);
    const [addAirport, setAddAirport] = useState(true);
    const [form, setForm] = useState([
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
            "renderInput": (onChange, attributeValue) => { 
                console.log(attributeValue);
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                        <select
                            id="dropdown-country"
                            className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={attributeValue} 
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                onChange(selectedValue);
                            }}
                        >
                            {countryOptions.map((option, index) => (
                                <option key={index} value={option.value}>  
                                    {option.value} 
                                </option>
                            ))}
                        </select>
                    </div>
                );
            }
        },                   
        {
            "attributeName": "City",
            "attributeType": "text",
            "attributeId": 4,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": null,
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
            "renderInput": (onChange, attributeValue) => { 
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                        <select
                            id="dropdown-timezone"
                            className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={attributeValue}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                const selectedOption = options.find(opt => opt.value === selectedValue);
                                setGmt(selectedOption?.gmt || ""); 
                                onChange(selectedValue);
                            }}
                        >
                            {options.map((option, index) => (
                                <option key={index} value={option.value}> 
                                    {option.value}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            }
        },                
        {
            "attributeName": "DST",
            "attributeType": "radio",
            "attributeId": 7,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": (onChange, attributeValue) => {  
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                        {["Y", "N"].map((val) => (
                            <div key={val} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <input
                                    type="radio"
                                    id={`dst-${val}`}
                                    name="dst"
                                    value={val}
                                    checked={attributeValue === val} 
                                    required
                                    className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    onChange={(e) => onChange(e.target.value)}  
                                />
                                <label htmlFor={`dst-${val}`} className="inline-flex items-center py-2 text-sm font-medium text-gray-700">
                                    {val === "Y" ? "Yes" : "No"}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            }
        }                
    ]);
    const [timezones, setTimezones] = useState("");
    const [gmt, setGmt] = useState("");
    const [dst, setDst] = useState("");
    const [terminals, setTerminals] = useState(terminal);
    const [airportId , setAirportId] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        id = searchParams.get("id");
        
        if (id) {
            setIsEditMode(true);
            const fetchAirport = async () => {
                try {
                    const result = await getAirport(id);
                    if (result) {
                        setAirport(result);
                        setAirportId(result.airport_id);
                        console.log(result);
                        console.log(form);
                        // Update form state with fetched data
                        setForm((prevForm) =>
                            prevForm.map((attribute) => {
                                if (attribute.attributeId === 1) {
                                    return { ...attribute, attributeValue: result.airportName || "" };
                                } else if (attribute.attributeId === 2) {
                                    if (result.country === "USA" || result.country === "UAE") {
                                        setCountry(result.country === "USA" ? "United States" : "United Arab Emirates");
                                    }
                                    return { ...attribute, attributeValue: result.country || "" };
                                } else if (attribute.attributeId === 4) {
                                    return { ...attribute, attributeValue: result.city || "" };
                                } else if (attribute.attributeId === 5) {
                                    return { ...attribute, attributeValue: result.iataCode || "" };
                                } else if (attribute.attributeId === 6) {
                                    let timezone = options.find(option => {
                                        return option.value === result.timezone
                                    }
                                    );
                                    if (!timezone){
                                        timezone = options.find(option => option.gmt === result.timezone);
                                    }
                                    return { ...attribute, attributeValue: timezone.value || "" };
                                } else if (attribute.attributeId === 7) {
                                    return { ...attribute, attributeValue: result.dst || "" };
                                }
                                return attribute;
                            })
                        );

                        console.log(form);
                        let option = countryOptions.find(options => options.value === result.country);
                        setCountry(option.value);

                        if (result.country === "USA" || result.country === "UAE") {
                            setCountry(result.country === "USA" ? "United States" : "United Arab Emirates");
                        }

                        // fetchStates(result.country);

                        let timezone = options.find(option => {
                            return option.value === result.timezone
                        }
                        );
                        if (!timezone){
                            timezone = options.find(option => option.gmt === result.timezone);
                        }
                        setTimezones(timezone.value);
                        setGmt(timezone.gmt);

                        setDst(result.dst);

                        if (Array.isArray(result.terminals) && result.terminals.length > 0) {
                            setTerminals(result.terminals.map((terminal) => {
                                console.log(terminal);
                                return { 
                                    terminalId: terminal.terminalId,
                                    terminalName: terminal.terminalName 
                                };
                            }));
                        }         
                        setLoading(false);
                    }
                } catch (error) {
                    console.error("Error fetching airport:", error);
                }
            };
            fetchAirport();
        }
        else{
            setLoading(false);
        }
    }, [location]);

    // useEffect(() => {
    //     if (!loading) {
    //         // setFormDetails([
    //         //     {
    //         //         "attributeName": "Airport Name",
    //         //         "attributeType": "text",
    //         //         "attributeId": 1,
    //         //         "attributeValue": "",
    //         //         "attributeRequired": true,
    //         //         "renderInput": null,
    //         //     },
    //         //     {
    //         //         "attributeName": "Country",
    //         //         "attributeType": "text",
    //         //         "attributeId": 2,
    //         //         "attributeValue": "",
    //         //         "attributeRequired": true,
    //         //         "renderInput": (onChange, attributeValue) => { 
    //         //             console.log(attributeValue);
    //         //             return (
    //         //                 <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
    //         //                     <select
    //         //                         id="dropdown-country"
    //         //                         className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //         //                         value={attributeValue} 
    //         //                         onChange={(e) => {
    //         //                             const selectedValue = e.target.value;
    //         //                             onChange(selectedValue);
    //         //                         }}
    //         //                     >
    //         //                         {countryOptions.map((option, index) => (
    //         //                             <option key={index} value={option.value}>  
    //         //                                 {option.value} 
    //         //                             </option>
    //         //                         ))}
    //         //                     </select>
    //         //                 </div>
    //         //             );
    //         //         }
    //         //     },                   
    //         //     {
    //         //         "attributeName": "City",
    //         //         "attributeType": "text",
    //         //         "attributeId": 4,
    //         //         "attributeValue": "",
    //         //         "attributeRequired": true,
    //         //         "renderInput": null,
    //         //     },
    //         //     {
    //         //         "attributeName": "IATA Code",
    //         //         "attributeType": "text",
    //         //         "attributeId": 5,
    //         //         "attributeValue": "",
    //         //         "attributeRequired": true,
    //         //         "renderInput": null,
    //         //     },
    //         //     {
    //         //         "attributeName": "Time Zone",
    //         //         "attributeType": "dropdown",
    //         //         "attributeId": 6,
    //         //         "attributeValue": "",
    //         //         "attributeRequired": true,
    //         //         "renderInput": (onChange, attributeValue) => { 
    //         //             return (
    //         //                 <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
    //         //                     <select
    //         //                         id="dropdown-timezone"
    //         //                         className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //         //                         value={attributeValue}
    //         //                         onChange={(e) => {
    //         //                             const selectedValue = e.target.value;
    //         //                             const selectedOption = options.find(opt => opt.value === selectedValue);
    //         //                             setGmt(selectedOption?.gmt || ""); 
    //         //                             onChange(selectedValue);
    //         //                         }}
    //         //                     >
    //         //                         {options.map((option, index) => (
    //         //                             <option key={index} value={option.value}> 
    //         //                                 {option.value}
    //         //                             </option>
    //         //                         ))}
    //         //                     </select>
    //         //                 </div>
    //         //             );
    //         //         }
    //         //     },                
    //         //     {
    //         //         "attributeName": "DST",
    //         //         "attributeType": "radio",
    //         //         "attributeId": 7,
    //         //         "attributeValue": "",
    //         //         "attributeRequired": true,
    //         //         "renderInput": (onChange, attributeValue) => {  
    //         //             return (
    //         //                 <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
    //         //                     {["Y", "N"].map((val) => (
    //         //                         <div key={val} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
    //         //                             <input
    //         //                                 type="radio"
    //         //                                 id={`dst-${val}`}
    //         //                                 name="dst"
    //         //                                 value={val}
    //         //                                 checked={attributeValue === val} 
    //         //                                 required
    //         //                                 className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //         //                                 onChange={(e) => onChange(e.target.value)}  
    //         //                             />
    //         //                             <label htmlFor={`dst-${val}`} className="inline-flex items-center py-2 text-sm font-medium text-gray-700">
    //         //                                 {val === "Y" ? "Yes" : "No"}
    //         //                             </label>
    //         //                         </div>
    //         //                     ))}
    //         //                 </div>
    //         //             );
    //         //         }
    //         //     }                
    //         // ]);
    //     }
    // },[loading]);

    // useEffect(() => {
    //     // if (formDetails.length > 0) {
    //     //     console.log(formDetails);
    //     //     console.log("Country: " + country);
    //     //     setForm(formDetails);
    //     // }
    // },[formDetails]);

    useEffect(() => {
        if (form.length > 0) {
            console.log(form);
            setRender(true);
        }
    }, [loading]);
    
    const [stateList, setStateList] = useState([]);
    const [state, setState] = useState("");
    const { getStates, addAirportFunc } = useGlobalContext();

    // const fetchStates = async (isoCode) => {
    //     try {
    //         const result = await getStates(isoCode);
    //         if (result) {
    //             setStateList(result);
    //             console.log("Fetched states:", result);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching states:", error);
    //     }
    // };

    console.log(form);
    const [city, setCity] = useState("");

    const addNewAirport = () => {
        terminals.filter((terminal) => terminal.terminalName === "");
        let airport = {
            airport_id: airportId,
            airportName: null,
            city: null,
            state: null,
            country: null,
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
            else if (attribute.attributeId === 2) {
                airport.country = attribute.attributeValue;
            }
            else if (attribute.attributeId === 4) {
                airport.city = attribute.attributeValue;
            }
            // else if (attribute.attributeId === 3) {
            //     airport.state = attribute.attributeValue;
            // }
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

        if (isEditMode){
            updateAirport(airport,airport.iataCode);
        }
        else{
            addAirportFunc(airport);
        }
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

    console.log(terminals);
  return (
    (!isEditMode || render) && (
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
                                {!isEditMode ? "Add Airport" : "Edit Airport"}
                            </div>
                        </div>
                        <div style={{
                            color: "#777777", fontSize: "14px", fontWeight: 400,
                            lineHeight: "16.8px", textAlign: "left", textUnderlinePosition: "from-font",
                            textDecorationSkipInk: "none", marginTop: "5px"
                        }}>
                            {!isEditMode ? "Add a new airport to the database" : "Edit an existing airport in the database"}
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
                                                    terminalName: "",
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
                                                    value={terminalObj.terminalName}
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
                            {form.map((attribute, index) => {
                                return (
                                    <div key={index}>
                                        <label
                                            htmlFor={`input-${attribute.attributeId}`}
                                            className="inline-flex items-center py-2 text-sm font-medium text-gray-700"
                                        >
                                            {attribute.attributeName}
                                        </label>
                                        {attribute.renderInput
                                            ? attribute.renderInput((value) => handleInputChange(attribute.attributeId, value), attribute.attributeValue) // ✅ Pass attributeValue
                                            : (
                                                <input
                                                    type={attribute.attributeType}
                                                    id={`input-${attribute.attributeId}`} // ✅ Ensure unique id
                                                    name={attribute.attributeName}
                                                    value={attribute.attributeValue}
                                                    required={attribute.attributeRequired}
                                                    className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                    onChange={(e) => setAttributeValue(attribute.attributeId, e.target.value)}
                                                />
                                            )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  )
}

export default addorEditAirport
