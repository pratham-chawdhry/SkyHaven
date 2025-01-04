import React, {useState} from "react";
import { Plane } from 'lucide-react';
import FileUpload from "../../components/FileUpload";
import OTPInput from "../../components/OTP";
import { set } from "date-fns";

function AddAirline() {
    const [addAirline, setAddAirline] = useState(true);
    const [onFileEncoded, setOnFileEncoded] = useState(null);
    const [description, setDescription] = useState("");
    const [OTP, setOTP] = useState("");

    const handleFileEncoded = (base64String) => {
        setOnFileEncoded(base64String);
    };

    const handleOTPChange = (value) => {
        setOTP(value);
    };

    const formDetails = [
        {
            "attributeName": "Airline Name",
            "attributeType": "text",
            "attributeId": 1,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": null,
        },
        {
            "attributeName": "Airline Code",
            "attributeType": "text",
            "attributeId": 2,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": (onChange) => {
                return (
                    <OTPInput length={2} onChange={handleOTPChange} attributeName="Airline Code" />
                );
            }
        },
        {
            "attributeName": "Logo",
            "attributeType": "file",
            "attributeId": 3,
            "attributeValue": "",
            "attributeRequired": true,
            "renderInput": (onChange) => {
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                        <FileUpload onFileEncoded={handleFileEncoded} />
                    </div>
                );
            }
        },
    ]

    const [form, setForm] = useState(formDetails);

    const addNewAirline = () => {
        let airline = {
            airlineName: null,
            airlineCode: OTP,
            logo: onFileEncoded,
            description: description,
        };

        form.map((attribute) => {
            if (attribute.attributeId === 1) {
                airline.airlineName = attribute.attributeValue;
            }
        });

        console.log(airline);
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
    <div>
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
                            {addAirline ? "Add Airline" : "Edit Airline"}
                        </div>
                    </div>
                    <div style={{
                        color: "#777777", fontSize: "14px", fontWeight: 400,
                        lineHeight: "16.8px", textAlign: "left", textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none", marginTop: "5px"
                    }}>
                        {addAirline ? "Add a new airline to the database" : "Edit an existing airline in the database"}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
                    <div>
                        <button onClick={(e) => addNewAirline()} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{width: "90%"}}>
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
            <div style={{width: "90%"}}>
                    <label
                        htmlFor="dropdown"
                        className="inline-flex items-center py-2 text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea style={{ width : "600px"}} className="mt-1 mb-4 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" rows="5" placeholder="Enter description here..."
                    onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
            </div>
        </div>
    </div>
  );
}

export default AddAirline;
