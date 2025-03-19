    import React, { useState, useEffect } from "react";
    import { Plane } from "lucide-react";
    import FileUpload from "../../components/FileUpload";
    import OTPInput from "../../components/OTP";
    import { useLocation } from "react-router-dom";
    import { useGlobalContext } from "../../context";

    function AddAirline() {
    const location = useLocation();
    const { getAirline, updateAirline, addAirline } = useGlobalContext();

    const [isEditMode, setIsEditMode] = useState(true);
    const [loading, setLoading] = useState(true);
    const [airlineId, setAirlineId] = useState(null);
    const [description, setDescription] = useState("");
    const [OTP, setOTP] = useState("");
    const [onFileEncoded, setOnFileEncoded] = useState(null);
    const [form, setForm] = useState([
        {
            attributeName: "Airline Name",
            attributeType: "text",
            attributeId: 1,
            attributeValue: "",
            attributeRequired: true,
            renderInput: null,
        },
        // {
        //     attributeName: "Airline Code",
        //     attributeType: "text",
        //     attributeId: 2,
        //     attributeValue: "",
        //     attributeRequired: true,
        //     renderInput: (onChange, attributeValue) => {
        //         console.log(onChange);
        //         console.log(attributeValue);
        //         return (
        //             <OTPInput
        //                 length={2}
        //                 onChange={handleOTPChange}
        //                 attributeName="Airline Code"
        //                 defaultValue={attributeValue || ""}
        //             />
        //         );
        //     },            
        // },
        {
            attributeName: "Logo",
            attributeType: "file",
            attributeId: 3,
            attributeValue: "",
            attributeRequired: true,
            renderInput: () => {
            return (
                <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                <FileUpload onFileEncoded={handleFileEncoded} />
                </div>
            );
            },
        },
    ]);

    const [discountDetails, setDiscountDetails] = useState([
    {
        discountName: "Armed Forces",
        discountPercentage: null,
        discountUpTo: null,
    },
    {
        discountName: "Senior Citizens",
        discountPercentage: null,
        discountUpTo: null,
    },
    {
        discountName: "Students",
        discountPercentage: null,
        discountUpTo: null,
    },
    {
        discountName: "Doctors & Nurses",
        discountPercentage: null,
        discountUpTo: null,
    },
    ]);

    function handleFileEncoded(base64String) {
    setOnFileEncoded(base64String);
    }

    function handleOTPChange(value) {
        setOTP(value);
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get("id");
        if (id) {
            setIsEditMode(true);
            const fetchAirline = async () => {
            try {
                const airlineData = await getAirline(id);
                if (airlineData) {
                    setForm((prevForm) =>
                        prevForm.map((attribute) => {
                        if (attribute.attributeId === 1) {
                            return {
                            ...attribute,
                            attributeValue: airlineData.airlineName || "",
                            };
                        } else if (attribute.attributeId === 2) {
                            return {
                                ...attribute,
                                attributeValue: airlineData.airlineCode || "",  // Removed extra comma
                                renderInput: (onChange, attributeValue) => {
                                    console.log(onChange);
                                    console.log(attributeValue);
                                    return (
                                        <OTPInput
                                            length={2}
                                            onChange={handleOTPChange}
                                            attributeName="Airline Code"
                                            defaultValue={attributeValue || ""}
                                        />
                                    );
                                },
                            };
                        }else if (attribute.attributeId === 3) {
                            setOnFileEncoded(airlineData.logo || null);
                            return {
                            ...attribute,
                            attributeValue: airlineData.logo || "",
                            };
                        }
                        return attribute;
                        })
                );
                setOTP(airlineData.airlineCode || "");
                console.log(airlineData.airlineCode);
                setAirlineId(airlineData.id);
                setDiscountDetails(airlineData.discounts);
                setDescription(airlineData.description || "");
                }
            } catch (err) {
                console.error("Error fetching airline:", err);
            } finally {
                setLoading(false);
            }
            };
            fetchAirline();
        } else {
            setIsEditMode(false);
            setLoading(false);
        }
    }, [location]);

    const handleInputChange = (id, value) => {
    setForm((prevForm) =>
        prevForm.map((attr) => {
        if (attr.attributeId === id) {
            return { ...attr, attributeValue: value };
        }
        return attr;
        })
    );
    };

    const setAttributeValue = (attributeId, value) => {
    setForm((prevForm) =>
        prevForm.map((formItem) =>
        formItem.attributeId === attributeId
            ? { ...formItem, attributeValue: value }
            : formItem
        )
    );
    };

    const addOrUpdateAirline = () => {
    let airline = {
        id: airlineId,
        airlineName: "",
        airlineCode: OTP,
        logo: onFileEncoded,
        description: description,
        discounts: discountDetails,
    };

    form.forEach((attribute) => {
        if (attribute.attributeId === 1) {
        airline.airlineName = attribute.attributeValue;
        }
    });

    console.log(airline);
    if (isEditMode) {
        updateAirline(airline, airline.id);
    } else {
        addAirline(airline);
    }
    };

    const [render, setRender] = useState(false);

    useEffect(() => {
        if (form.length > 0) {
            // handleOTPChange(OTP);
            // console.log(form);
            // console.log(OTP);
            setRender(true);
        }
    }, [loading]);

    console.log(render || !isEditMode)
    return (
    (render) &&
    (<div>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
        className="mt-3"
        >
        <div
            className="flex justify-between items-center"
            style={{
            paddingTop: "30px",
            paddingBottom: "30px",
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
            width: "90%",
            }}
        >
            <div className="flex flex-col">
            <div className="flex gap-4 items-center">
                <div>
                <Plane style={{ color: "#777777" }} width={25} height={25} />
                </div>
                <div
                style={{
                    color: "#1B273A",
                    fontSize: "28px",
                    fontWeight: 700,
                    lineHeight: "28.8px",
                    textAlign: "left",
                }}
                >
                {isEditMode ? `Edit Airline ${OTP}` : "Add Airline"}
                </div>
            </div>
            <div
                style={{
                color: "#777777",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "16.8px",
                textAlign: "left",
                marginTop: "5px",
                }}
            >
                {isEditMode
                ? "Edit an existing airline in the database"
                : "Add a new airline to the database"}
            </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
                <button
                onClick={addOrUpdateAirline}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                Save
                </button>
            </div>
            </div>
        </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "90%", display: "flex", gap: "30px" }}>
            <div>
            <div
                style={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
                flexWrap: "wrap",
                }}
            >
                {form.map((attribute, index) => {
                return (
                    (attribute.attributeId !== 2 &&<div key={index}>
                    <label
                        htmlFor={`input-${attribute.attributeId}`}
                        className="inline-flex items-center py-2 text-sm font-medium text-gray-700"
                    >
                        {attribute.attributeName}
                    </label>
                    {attribute.attributeId !== 2 && (attribute.renderInput && attribute ? (
                        attribute.renderInput((value) =>
                            handleInputChange(attribute.attributeId, value)
                        )
                    ) : (
                        <input
                            type={attribute.attributeType}
                            id={`input-${attribute.attributeId}`}
                            name={attribute.attributeName}
                            value={attribute.attributeValue}
                            required={attribute.attributeRequired}
                            className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) =>
                                setAttributeValue(attribute.attributeId, e.target.value)
                            }
                        />
                    ))}
                    </div>)
                );
                })}

                <label
                    className="inline-flex items-center py-2 text-sm font-medium text-gray-700"
                >
                    Airline Code
                </label>
                <div className="flex gap-4 items-center">
                <div>
                    {(() => {
                        console.log(OTP);
                        return (
                        <OTPInput
                            length={2}
                            onChange={handleOTPChange}
                            attributeName="Airline Code"
                            defaultValue={OTP}
                        />
                        );
                    })()}
                    </div>
                </div>
            </div>
            <div style={{ width: "100%" }}>
                <label
                htmlFor="description"
                className="inline-flex items-center py-2 text-sm font-medium text-gray-700"
                >
                Description
                </label>
                <textarea
                style={{ width: "100%" }}
                className="mt-1 mb-4 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows="5"
                placeholder="Enter description here..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                ></textarea>
            </div>
            </div>
            <div>
            <div
                style={{ display: "flex", flexDirection: "column", width: "110%" }}
            >
                <div>
                <label
                    htmlFor="discounts"
                    className="inline-flex items-center py-2 text-sm font-medium text-gray-700"
                >
                    Discounts
                </label>
                </div>
                <div
                style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    border: "2px solid #E2E2E2",
                    height: "300px",
                    marginTop: "5px",
                }}
                className="bg-white shadow-md rounded-lg mb-10"
                >
                <table
                    style={{
                    backgroundColor: "white",
                    whiteSpace: "nowrap",
                    }}
                >
                    <thead>
                    <tr style={{ fontStyle: "italic" }}>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                        Discount Name
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                        Discount Percentage
                        </th>
                        <th className="px-4 py-2 text-center text-gray-700 font-medium">
                        Discount Up To
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {discountDetails.map((discount, index) => (
                        <tr key={index}>
                        <td
                            className="px-4 py-2 text-left"
                            style={{ textAlign: "center" }}
                        >
                            {discount.discountName}
                        </td>
                        <td className="text-center">
                            <input
                            type="number"
                            placeholder="Enter Discount Percentage"
                            id={`discountPercentage-${index}`}
                            name="discountPercentage"
                            value={discount.discountPercentage || ""}
                            required={true}
                            className="mt-1 block w-60 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) =>
                                setDiscountDetails((prevDiscounts) =>
                                prevDiscounts.map((disc, discIndex) => {
                                    if (discIndex === index) {
                                    return {
                                        ...disc,
                                        discountPercentage: Number(e.target.value),
                                    };
                                    }
                                    return disc;
                                })
                                )
                            }
                            />
                        </td>
                        <td className="text-center">
                            <input
                            type="number"
                            placeholder="Enter Discount Up To"
                            id={`discountUpTo-${index}`}
                            name="discountUpTo"
                            value={discount.discountUpTo || ""}
                            required={true}
                            className="mt-1 block w-30 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            onChange={(e) =>
                                setDiscountDetails((prevDiscounts) =>
                                prevDiscounts.map((disc, discIndex) => {
                                    if (discIndex === index) {
                                    return {
                                        ...disc,
                                        discountUpTo: Number(e.target.value),
                                    };
                                    }
                                    return disc;
                                })
                                )
                            }
                            />
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>)
    );
}

export default AddAirline;
