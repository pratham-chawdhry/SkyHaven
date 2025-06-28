// src/pages/add/AddFlight.jsx
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Plane } from "lucide-react";
import { useGlobalContext } from "../../context";
import { parse } from "date-fns";

const formSchemaTemplate = [
  {
    attributeId: 1,
    attributeName: "Flight Number",
    attributeType: "text",
    attributeValue: "",
    attributeRequired: true,
    optionsSource: null,
  },
  {
    attributeId: 2,
    attributeName: "Aircraft Model",
    attributeType: "text",
    attributeValue: "",
    attributeRequired: true,
    optionsSource: null,
  },
  {
    attributeId: 3,
    attributeName: "Cabin Class List",
    attributeType: "dropdown",
    attributeValue: "",
    attributeRequired: true,
    optionsSource: "cabinClasses",
  },
  {
    attributeId: 4,
    attributeName: "Departure Airport",
    attributeType: "dropdown",
    attributeValue: "",
    attributeRequired: true,
    optionsSource: "airports",
  },
  {
    attributeId: 5,
    attributeName: "Departure Terminal",
    attributeType: "dropdown",
    attributeValue: "",
    attributeRequired: true,
    optionsSource: "departureTerminals",
    dependsOn: 4, // ID of the field it depends on
  },
  {
    attributeId: 6,
    attributeName: "Arrival Airport",
    attributeType: "dropdown",
    attributeValue: "",
    attributeRequired: true,
    optionsSource: "airports",
  },
  {
    attributeId: 7,
    attributeName: "Arrival Terminal",
    attributeType: "dropdown",
    attributeValue: "",
    attributeRequired: true,
    optionsSource: "arrivalTerminals",
    dependsOn: 6,
  },
  {
    attributeId: 8,
    attributeName: "Departure Time",
    attributeType: "datetime",
    attributeValue: "",
    attributeRequired: true,
  },
  {
    attributeId: 9,
    attributeName: "Arrival Time",
    attributeType: "datetime",
    attributeValue: "",
    attributeRequired: true,
  },
  {
    attributeId: 10,
    attributeName: "First Class Price",
    attributeType: "number",
    attributeValue: "",
    attributeRequired: true,
  },
  {
    attributeId: 11,
    attributeName: "Business Class Price",
    attributeType: "number",
    attributeValue: "",
    attributeRequired: true,
  },
  {
    attributeId: 12,
    attributeName: "Premium Economy Price",
    attributeType: "number",
    attributeValue: "",
    attributeRequired: true,
  },
  {
    attributeId: 13,
    attributeName: "Economy Class Price",
    attributeType: "number",
    attributeValue: "",
    attributeRequired: true,
  },
];

export default function AddFlight() {
  const {
    getAirports,
    getFlight,
    saveFlight,
    getAirplaneConfigurations,
  } = useGlobalContext();

  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState(formSchemaTemplate);
  const [airports, setAirports] = useState([]);
  const [departureTerminals, setDepartureTerminals] = useState([]);
  const [arrivalTerminals, setArrivalTerminals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flight, setFlight] = useState({});
  const [cabinClassList, setCabinClassList] = useState([]);

  const [firstClassDisabled, setFirstClassDisabled] = useState(false);
  const [businessClassDisabled, setBusinessClassDisabled] = useState(false);
  const [premiumEconomyClassDisabled, setPremiumEconomyClassDisabled] = useState(false);
  const [economyClassDisabled, setEconomyClassDisabled] = useState(false);

  // 1) Load airports once
  useEffect(() => {
    getAirports().then(setAirports);
    getAirplaneConfigurations().then(setCabinClassList);
  }, []);

  // 2) If there's an `id` query param, fetch the flight and prefill the form
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flightId = params.get("id");
    if (!flightId){
        setLoading(true);
        return;
    }

    setIsEditMode(true);
    getFlight(flightId)
        .then(flight => {
        setFlight(flight);
        setForm(f =>
            f.map(field => {
            console.log(flight);
            if (field.attributeId === 6) {
                return { ...field, attributeValue: flight.airportArrival?.iataCode || "" };
            }
            else if (field.attributeId === 3){
                flight.cabinClassList.cabinClasses.forEach(c => {
                    if (c.cabinCode === "FIR" && c.disabled) {
                        setFirstClassDisabled(true);
                    }
                    else if (c.cabinCode === "BUS" && c.disabled) {
                        setBusinessClassDisabled(true);
                    }
                    else if (c.cabinCode === "PRE" && c.disabled) {
                        setPremiumEconomyClassDisabled(true);
                    }
                    else if (c.cabinCode === "ECO" && c.disabled) {
                        setEconomyClassDisabled(true);
                    }
                });
                return { ...field, attributeValue: flight.cabinClassList.id || "" };
            }
            else if (field.attributeId === 4) {
                return { ...field, attributeValue: flight.airportDeparture?.iataCode || "" };
            }
            else if (field.attributeId === 5) {
                return { ...field, attributeValue: flight.airportDeparture?.terminals?.terminalName|| "" };
            }
            else if (field.attributeId === 7) {
                return { ...field, attributeValue: flight.airportArrival?.terminals?.terminalName || "" };
            }
            const key = field.attributeName
                .split(" ")
                .map((w, i) => (i === 0 ? w.toLowerCase() : w))
                .join("");
            return {
                ...field,
                attributeValue: flight[key] ?? "",
            };
        })
        );
      })
      .catch(console.error);
      setLoading(true);
  }, []);

  // 3) Whenever departure airport changes, reload its terminals
  useEffect(() => {
    const depAirport = form.find(f => f.attributeId === 4)?.attributeValue;
    const airport = airports.find(a => a.iataCode === depAirport);
    if (airport) {
        console.log("Fetching terminals for departure: " + depAirport);
        setDepartureTerminals(airport.terminals || []);
    } else {
        setDepartureTerminals([]);
    }
    }, [form.find(f => f.attributeId === 4)?.attributeValue]);

    useEffect(() => {
    const arrAirport = form.find(f => f.attributeId === 6)?.attributeValue;
    const airport = airports.find(a => a.iataCode === arrAirport);
    if (airport) {
        console.log("Fetching terminals for arrival: " + arrAirport);
        setArrivalTerminals(airport.terminals || []);
    } else {
        setArrivalTerminals([]);
    }
    }, [form.find(f => f.attributeId === 6)?.attributeValue]);

    const updateField = (id, value) => {
        if (id === 3) {
            // Reset all to false first
            setFirstClassDisabled(false);
            setBusinessClassDisabled(false);
            setPremiumEconomyClassDisabled(false);
            setEconomyClassDisabled(false);

            // Find the selected cabin configuration
            const selectedConfig = cabinClassList.filter(c => {
                return c.id === parseInt(value, 10);
            });

            selectedConfig[0].cabinClasses.forEach(c => {
                if (c.cabinCode === "FIR" && c.disabled) {
                setForm(f =>
                    f.map(field =>
                    field.attributeId === 10 ? { ...field, attributeValue: null } : field
                    )
                );
                setFirstClassDisabled(true);
                }
                if (c.cabinCode === "BUS" && c.disabled) {
                setForm(f =>
                    f.map(field =>
                    field.attributeId === 11 ? { ...field, attributeValue: null } : field
                    )
                );
                setBusinessClassDisabled(true);
                }
                if (c.cabinCode === "PRE" && c.disabled) {
                setForm(f =>
                    f.map(field =>
                    field.attributeId === 12 ? { ...field, attributeValue: null } : field
                    )
                );
                setPremiumEconomyClassDisabled(true);
                }
                if (c.cabinCode === "ECO" && c.disabled) {
                setForm(f =>
                    f.map(field =>
                    field.attributeId === 13 ? { ...field, attributeValue: null } : field
                    )
                );
                setEconomyClassDisabled(true);
                }
            });

        }

        // Update the actual form field
        setForm(f =>
            f.map(field =>
            field.attributeId === id ? { ...field, attributeValue: value } : field
            )
        );
        };


    const renderField = field => {
    const common = {
        value: field.attributeValue,
        required: field.attributeRequired,
        onChange: e => updateField(field.attributeId, e.target.value),
        className:
        "mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm " +
        "focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
    };

    switch (field.attributeType) {
        case "text": return <input key={field.attributeId} type={field.attributeType} {...common} />;
        case "number": {
            let isDisabled = false;
            if (field.attributeId === 10) isDisabled = firstClassDisabled;
            else if (field.attributeId === 11) isDisabled = businessClassDisabled;
            else if (field.attributeId === 12) isDisabled = premiumEconomyClassDisabled;
            else if (field.attributeId === 13) isDisabled = economyClassDisabled;

            return (
                <input
                key={field.attributeId}
                type="number"
                disabled={isDisabled}
                value={field.attributeValue === null ? "" : field.attributeValue}
                required={field.attributeRequired}
                onChange={e =>
                    updateField(
                    field.attributeId,
                    e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                }
                className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            );
        }


        case "dropdown":
        let opts = [];
        if (field.optionsSource === "airports") opts = airports;
        else if (field.optionsSource === "departureTerminals") opts = departureTerminals;
        else if (field.optionsSource === "arrivalTerminals") opts = arrivalTerminals;

        console.log(field.attributeValue, field.attributeId);
        return (
  <select
    key={field.attributeId}
    {...common}
    value={field.attributeValue}
    onChange={e => updateField(field.attributeId, e.target.value)}
  >
    <option value="">Select {field.attributeName}</option>
    {field.optionsSource === "cabinClasses" &&
      cabinClassList.map((o, index) => (
        <option key={index} value={o.id}>
          {o.id}
        </option>
      ))}

    {field.optionsSource === "airports" &&
      airports.map((o, index) => (
        <option key={index} value={o.iataCode}>
          {o.city}
        </option>
      ))}

    {field.optionsSource === "departureTerminals" &&
      departureTerminals.map((o, index) => (
        <option key={index} value={o.terminalId}>
          {o.terminalName}
        </option>
      ))}

    {field.optionsSource === "arrivalTerminals" &&
      arrivalTerminals.map((o, index) => (
        <option key={index} value={o.terminalId}>
          {o.terminalName}
        </option>
      ))}
  </select>
);


        case "datetime":
        return (
            <DatePicker
            key={field.attributeId}
            selected={
                field.attributeValue ? new Date(field.attributeValue) : new Date()
            }
            onChange={date =>
                updateField(field.attributeId, date.toISOString())
            }
            showTimeSelect
            dateFormat="Pp"
            className={common.className}
            placeholderText={`Select ${field.attributeName}`}
            />
        );

        default:
        return null;
    }
    };

    const handleSubmit = () => {
        const payload = {};
        form.forEach(f => {
        const key = f.attributeName
            .split(" ")
            .map((w, i) => (i === 0 ? w.toLowerCase() : w))
            .join("");
        payload[key] = f.attributeValue;
        });
        console.log(payload);
        // saveFlight(payload);
    };

    return (
        <div className="max-w-6xl mx-auto mt-6 mb-6">
            <div className="flex justify-between items-center pb-6 mb-6 border-b border-gray-200">
                <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    {isEditMode
                    ? `Edit Flight ${form.find(f => f.attributeId === 1)?.attributeValue}`
                    : "Add New Flight"}
                </h1>
                <p className="text-gray-600 mt-1">
                    {isEditMode
                    ? "Edit flight details in the database"
                    : "Add a new flight to the database"}
                </p>
                </div>
                <button
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                >
                {isEditMode ? "Update Flight" : "Create Flight"}
                </button>
            </div>

            {loading && <div className="flex flex-wrap gap-x-8 gap-y-6">
                {form.map(field => (
                <div key={field.attributeId} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                    {field.attributeName}
                    </label>
                    {renderField(field)}
                </div>
                ))}
            </div>}
        </div>
    );
}
