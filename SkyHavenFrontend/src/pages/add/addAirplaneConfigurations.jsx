import React, { useState, useEffect } from "react";
import Checkbox from "../../components/Checkbox";
import { Plus, Trash2 } from "lucide-react";
import { set } from "date-fns";
import SeatingForm from "../../components/SeatingForm";
import Seat from "../../components/Seat";
import Modal from "../../components/Modal";
import { Sofa } from 'lucide-react';
import { useGlobalContext } from '../../context';
import { use } from "react";
import { useLocation } from "react-router-dom";

// const initialCabinClasses = [
//   {
//     cabinName: "First Class",
//     cabinCode: "FIR",
//     disabled: false,
//     seating: [
//       {
//         numberOfRows: 1,
//         startRow: null,
//         endRow: null,
//         aislePrice: 150,
//         middlePrice: 150,
//         windowPrice: 150,
//         extraLegroom: true,
//         seatSeating : [1,1,1]
//       },
//       {
//         numberOfRows: 1,
//         startRow: null,
//         endRow: null,
//         aislePrice: 100,
//         middlePrice: 100,
//         windowPrice: 100,
//         extraLegroom: false,
//         seatSeating : [1,1,1]
//       }
//     ],
//   },
//   {
//     cabinName: "Business Class",
//     cabinCode: "BUS",
//     disabled: false,
//     seating: [
//       {
//         numberOfRows: 1,
//         startRow: null,
//         endRow: null,
//         aislePrice: 90,
//         middlePrice: 90,
//         windowPrice: 90,
//         extraLegroom: true,
//         seatSeating : [2,2,2]
//       },
//       {
//         numberOfRows: 3,
//         startRow: null,
//         endRow: null,
//         aislePrice: 75,
//         middlePrice: 75,
//         windowPrice: 75,
//         extraLegroom: false,
//         seatSeating : [2,2,2]
//       }
//     ],
//   },
//   {
//     cabinName: "Premium Economy Class",
//     cabinCode: "PRE",
//     disabled: false,
//     seating: [
//       {
//         numberOfRows: 1,
//         startRow: null,
//         endRow: null,
//         aislePrice: 60,
//         middlePrice: 60,
//         windowPrice: 60,
//         extraLegroom: true,
//         seatSeating : [0,2,0]
//       },
//       {
//         numberOfRows: 1,
//         startRow: null,
//         endRow: null,
//         aislePrice: 60,
//         middlePrice: 60,
//         windowPrice: 60,
//         extraLegroom: true,
//         seatSeating : [3,0,3]
//       },
//       {
//         numberOfRows: 5,
//         startRow: null,
//         endRow: null,
//         aislePrice: 45,
//         middlePrice: 45,
//         windowPrice: 45,
//         extraLegroom: false,
//         seatSeating : [3,3,3]
//       },
//     ],
//   },
//   {
//     cabinName: "Economy Class",
//     cabinCode: "ECO",
//     disabled: false,
//     seating: [
//       {
//         numberOfRows: 3,
//         startRow: null,
//         endRow: null,
//         aislePrice: 15,
//         middlePrice: 15,
//         windowPrice: 15,
//         extraLegroom: false,
//         seatSeating : [3,3,3]
//       },
//       {
//         numberOfRows: 2,
//         startRow: null,
//         endRow: null,
//         aislePrice: 30,
//         middlePrice: 30,
//         windowPrice: 30,
//         extraLegroom: true,
//         seatSeating : [3,3,3]
//       },
//       {
//         numberOfRows: 10,
//         startRow: null,
//         endRow: null,
//         aislePrice: 15,
//         middlePrice: 15,
//         windowPrice: 15,
//         extraLegroom: false,
//         seatSeating : [3,3,3]
//       },
//       {
//         numberOfRows: 4,
//         startRow: null,
//         endRow: null,
//         aislePrice: 10,
//         middlePrice: 0,
//         windowPrice: 10,
//         extraLegroom: false,
//         seatSeating : [3,3,3]
//       },
//       {
//         numberOfRows: 6,
//         startRow: null,
//         endRow: null,
//         aislePrice: 0,
//         middlePrice: 0,
//         windowPrice: 0,
//         extraLegroom: false,
//         seatSeating : [3,3,3]
//       },
//     ],
//   },
// ];

const initialCabinClasses = [
  {
    cabinName: "First Class",
    cabinCode: "FIR",
    disabled: false,
    seating: [
      {
        numberOfRows: null,
        startRow: null,
        endRow: null,
        aislePrice: null,
        middlePrice: null,
        windowPrice: null,
        extraLegroom: false,
        seatSeating : [0,0,0]
      },
    ],
  },
  {
    cabinName: "Business Class",
    cabinCode: "BUS",
    disabled: false,
    seating: [
      {
        numberOfRows: null,
        startRow: null,
        endRow: null,
        aislePrice: null,
        middlePrice: null,
        windowPrice: null,
        extraLegroom: false,
        seatSeating : [0,0,0]
      },
    ],
  },
  {
    cabinName: "Premium Economy Class",
    cabinCode: "PRE",
    disabled: false,
    seating: [
      {
        numberOfRows: null,
        startRow: null,
        endRow: null,
        aislePrice: null,
        middlePrice: null,
        windowPrice: null,
        extraLegroom: false,
        seatSeating : [0,0,0]
      }
    ],
  },
  {
    cabinName: "Economy Class",
    cabinCode: "ECO",
    disabled: false,
    seating: [
      {
        numberOfRows: null,
        startRow: null,
        endRow: null,
        aislePrice: null,
        middlePrice: null,
        windowPrice: null,
        extraLegroom: false,
        seatSeating : [0,0,0]
      }
    ],
  },
];


function AddorEditAirplaneConfigurations() {
  const [cabinClasses, setCabinClasses] = useState(initialCabinClasses);
  const [aisles, setAisles] = useState(1);
  const [renderArray, setRenderArray] = useState([]);
  const [cabinClassTemp, setCabinClassTemp] = useState(initialCabinClasses);

  const {addAirplaneConfigurations, updateAirplaneConfiguration, getAirplaneConfiguration} = useGlobalContext();

  const [isEditMode, setIsEditMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [airplaneConfigurationId, setAirplaneConfigurationId] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    if (id) {
      setIsEditMode(true);
      const fetchAirplaneConfiguration = async () => {
        try {
          const result = await getAirplaneConfiguration(id);
          setCabinClassTemp(result.cabinClasses);
          setCabinClasses(result.cabinClasses);
          if (result) {
            setAirplaneConfigurationId(result.id);
            console.log(result);
          }
        } catch (error) {
          console.error("Error fetching airplane configuration:", error);
        }
      };
      fetchAirplaneConfiguration();
      setLoading(false);
    } else {
      setIsEditMode(false);
      setLoading(false);
    }
  }, [location]);

  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, [loading]);

  const handleSubmit = async () => {
    await new Promise((resolve) => {
      setRowNumber();
      setRenderArray(seatingFormCabins(cabinClasses));
      resolve();
    }).then(async () => {
      try {
        console.log(cabinClassTemp);
        setCabinClasses(cabinClassTemp);
        let object = {
          aisles: aisles,
          cabinClasses: cabinClassTemp,
        };
        if (isEditMode) {
          const result = await updateAirplaneConfiguration(object, airplaneConfigurationId);
          console.log(result);
        } else {
          const result = await addAirplaneConfigurations(object);
          console.log(result);
        }
      } catch (error) {
        console.error("Error submitting airplane configurations:", error);
      }
    });
  };
  

  const setRowNumber = () => {
    let rowNumber = 1;

    setCabinClasses(cabinClassTemp);

    console.log(cabinClassTemp);

    cabinClasses.forEach((cabin) => {
      if (!cabin.disabled){
        cabin.seating.forEach((seatingConfig) => {
          const {numberOfRows} = seatingConfig;

          seatingConfig.startRow = rowNumber;
          seatingConfig.endRow = rowNumber + numberOfRows - 1;
          rowNumber += numberOfRows;
        });
      }
    });

    console.log(cabinClasses);
  }

  const seatingFormCabins = (cabinClasses, startRowNumber) => {
    const seats = [];

    cabinClasses.forEach((cabin, cabinIndex) => {
      if (!cabin.disabled) {
        let cabinFlag = true;
        cabin.seating.forEach((seatingConfig, seatIndex) => {
            let {numberOfRows} = seatingConfig;

            if (numberOfRows !== 0){
                cabinFlag = false;
            }
        });
        cabin.disabled = cabinFlag;
      }
    });

    cabinClasses.forEach((cabin) => {
      if (!cabin.disabled){
        cabin.seating.forEach((seatingConfig, seatIndex) => {
          const { numberOfRows, seatSeating, extraLegroom } = seatingConfig;

          for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            const row = [];
            let seatType = cabin.cabinName;
            let extraLegroomFlag = false;
            if (extraLegroom) {
              extraLegroomFlag = true;
            }

            let previousSection = 0;

            seatSeating.forEach((seatCount, sectionIndex) => {
                if (sectionIndex <= aisles){
                    if (sectionIndex > 0){
                        previousSection += seatSeating[sectionIndex - 1]
                    }
                    for (let seatIndex = 0; seatIndex < seatCount; seatIndex++) {
                        const seatLetter = String.fromCharCode(
                        65 + seatIndex + previousSection
                        );

                        let price = 0;

                        let free = false;
                        if (seatIndex === 0){
                        if (sectionIndex === 0){
                            price = seatingConfig.windowPrice;
                            if (!seatingConfig.windowPrice){
                            free = true;
                            }
                        }
                        else{
                            price = seatingConfig.aislePrice;
                            if (!seatingConfig.aislePrice){
                            free = true;
                            }
                        }
                        }
                        else if (seatIndex === seatCount - 1){
                        if (sectionIndex === aisles){
                            price = seatingConfig.windowPrice;
                            if (!seatingConfig.windowPrice){
                            free = true;
                            }
                        }
                        else{
                            price = seatingConfig.aislePrice;
                            if (!seatingConfig.aislePrice){
                            free = true;
                            }
                        }
                        }
                        else{
                        price = seatingConfig.middlePrice;
                        if (!seatingConfig.middlePrice){
                            free = true;
                        }
                        }

                        const seatNumber = `${seats.length + 1 + startRowNumber}${seatLetter}`;
                        row.push({
                        id: seatNumber,
                        seatNumber: seatNumber,
                        seatType: seatType,
                        occupied: "No",
                        extraLegroom: extraLegroomFlag,
                        free : free,
                        price : price,
                        });
                    }

                    if (sectionIndex < seatSeating.length - 1 && sectionIndex < aisles) {
                        if (seatSeating[sectionIndex] && seatSeating[sectionIndex + 1]) {
                            row.push(null);
                        }
                        if (aisles === 2){
                            if (sectionIndex === 0 && seatSeating[0] && seatSeating[2] && !seatSeating[1]) {
                                row.push(null);
                                row.push(null);
                            }
                        }
                    }
                }
            });
            seats.push(row);
          }
        });
      }
    });
    return seats;
  };

  function renderSeatPricing(seat, seatIndex) {
    const renderRowRange = (start, end) => `The rows ${start} to ${end}`;
    const renderSingleRow = (row) => `Row ${row}`;
  
    const renderPricingDetails = (seat) => {
      if (seat.windowPrice === seat.middlePrice && seat.middlePrice === seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.windowPrice} for any seat.`;
      }
      if (seat.windowPrice !== seat.middlePrice && seat.middlePrice !== seat.aislePrice && seat.windowPrice !== seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window seats, $${seat.middlePrice} for middle seats, and $${seat.aislePrice} for aisle seats.`;
      }
      if (seat.windowPrice === seat.aislePrice && seat.windowPrice !== seat.middlePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window and aisle seats, and $${seat.middlePrice} for middle seats.`;
      }
      if (seat.windowPrice === seat.middlePrice && seat.middlePrice !== seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window and middle seats, and $${seat.aislePrice} for aisle seats.`;
      }
      if (seat.middlePrice === seat.aislePrice && seat.windowPrice !== seat.middlePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.middlePrice} for middle and aisle seats, and $${seat.windowPrice} for window seats.`;
      }
    };
  
    const renderFreeSeatsDetails = (seat) => {
      if (!seat.windowPrice && !seat.middlePrice && !seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and all seats are free.`;
      }
      if (!seat.windowPrice && seat.middlePrice !== 0 && seat.aislePrice !== 0 && seat.middlePrice !== seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.middlePrice} for middle seats and $${seat.aislePrice} for aisle seats, while window seats are free.`;
      }
      if (seat.windowPrice !== 0 && !seat.middlePrice && seat.aislePrice !== 0 && seat.windowPrice !== seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window seats and $${seat.aislePrice} for aisle seats, while middle seats are free.`;
      }
      if (seat.windowPrice !== 0 && seat.middlePrice !== 0 && !seat.aislePrice && seat.windowPrice !== seat.middlePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window seats and $${seat.middlePrice} for middle seats, while aisle seats are free.`;
      }
      if (seat.windowPrice === seat.middlePrice && !seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window and middle seats, while aisle seats are free.`;
      }
      if (seat.windowPrice === seat.aislePrice && !seat.middlePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window and aisle seats, while middle seats are free.`;
      }
      if (!seat.windowPrice && seat.middlePrice === seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.middlePrice} for middle and aisle seats, while window seats are free.`;
      }
      if (seat.windowPrice !== 0 && !seat.middlePrice && !seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window seats, while middle and aisle seats are free.`;
      }
      if (!seat.windowPrice && seat.middlePrice !== 0 && !seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.middlePrice} for middle seats, while window and aisle seats are free.`;
      }
      if (!seat.windowPrice && !seat.middlePrice && seat.aislePrice !== 0) {
        return `follows the order ${seat.seatSeating.slice(0, aisles + 1).join("-")}, and the price is $${seat.aislePrice} for aisle seats, while window and middle seats are free.`;
      }
    };

    const extraLegroomDetails = (seat) => {
      if (seat.extraLegroom) {
        return `All the seats in this row ${seat.startRow !== seat.endRow ? "range" : ""} provide extra legroom.`;
      }
      return "";
    };
  
    return (
      <li key={seatIndex}>
        {seat.startRow !== seat.endRow
          ? (seat.windowPrice && seat.middlePrice&& seat.aislePrice
              ? `${renderRowRange(seat.startRow, seat.endRow)} ${renderPricingDetails(seat)} ${extraLegroomDetails(seat)}`
              : `${renderRowRange(seat.startRow, seat.endRow)} ${renderFreeSeatsDetails(seat)} ${extraLegroomDetails(seat)}`)
          : (seat.windowPrice && seat.middlePrice && seat.aislePrice
              ? `${renderSingleRow(seat.startRow)} ${renderPricingDetails(seat)} ${extraLegroomDetails(seat)}`
              : `${renderSingleRow(seat.startRow)} ${renderFreeSeatsDetails(seat)} ${extraLegroomDetails(seat)}`)}
      </li>
    );
  }

  const modalContent = () => {
    let cabinClassNumber = 0;
    let rowNumber = 0;

    cabinClasses.forEach((cabinClass, cabinIndex) => {
      if (!cabinClass.disabled) {
        cabinClassNumber = cabinClassNumber + 1;
      }
    });

    console.log(cabinClasses);
    return (
      <div>
        <div className="flex flex-col pl-10" style={{
          paddingTop: "30px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          paddingBottom: "30px",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}>
          <div className="flex gap-4 items-center">
            <div>
              <Sofa style={{color: "#777777"}} width={25} height={25}/>
            </div>
            <div style={{color: "#1B273A", fontSize: "28px", fontWeight: 700, lineHeight: "28.8px", textAlign: "left", textUnderlinePosition: "from-font", textDecorationSkipInk: "none"}}>
              Flight Seating Plan
            </div>
          </div>
          <div style={{
            color: "#777777", fontSize: "14px", fontWeight: 400,
            lineHeight: "16.8px", textAlign: "left", textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none", marginTop: "5px"
          }}>
            Visualises the seating plan along with prices for each seat.
          </div>
        </div>
        <div>
          <div style={{
          paddingTop: "30px",
          paddingLeft: "40px",
        }}>
          <div style={{
            color: "#777777", fontSize: "14px", fontWeight: 400,
            lineHeight: "16.8px", textAlign: "left", textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none", marginTop: "5px"
          }}>
            {`The seating plan is generated based on the number of rows, seating arrangement in a sequential order as filled in the form, and the aisles. The number of aisles is set to ${aisles} and the seats are arranged in ${cabinClassNumber} enabled cabin classes. The classes are as follows:`}
          </div>
          {
              cabinClasses.map((cabinClass, cabinIndex) => {
                if (!cabinClass.disabled) {
                  let seatsArray = [];
                  seatsArray.push(cabinClass)
                  let cabinClassArray = seatingFormCabins(seatsArray, cabinClass.seating[0].startRow - 1, aisles);
                  return (
                    cabinClassArray.length > 0 && (
                      <div key={cabinIndex}>
                        {/* Cabin Header */}
                        <div
                          className="mt-5 mb-5"
                          style={{
                            color: "#1B273A",
                            fontSize: "20px",
                            fontWeight: 600,
                            lineHeight: "28.8px",
                            textAlign: "left",
                            textUnderlinePosition: "from-font",
                            textDecorationSkipInk: "none",
                          }}
                        >
                          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <div>{cabinClass.cabinName}</div>
                            <div
                              style={{
                                display: "inline-block",
                                backgroundColor: "#E8F5FF",
                                whiteSpace: "nowrap",
                                color: "#036FE3",
                                fontWeight: 600,
                                padding: "4px 10px",
                                borderRadius: "12px",
                                fontSize: "11px",
                                lineHeight: "17px",
                              }}
                            >
                              {cabinClass.cabinCode}
                            </div>
                          </div>
                        </div>
                  
                        {/* Cabin Details */}
                        <ul
                          style={{
                            listStyleType: "inherit",
                            fontSize: "14px",
                            lineHeight: "20px",
                            fontStyle: "italic",
                            marginBottom: "10px",
                          }}
                        >
                          <li>{`The number of rows is ${cabinClassArray.length}.`}</li>
                          {cabinClass.seating.map((seat, seatIndex) => (
                            <React.Fragment key={seatIndex}>{renderSeatPricing(seat, seatIndex)}</React.Fragment>
                          ))}
                        </ul>
                  
                        {/* Seat Component */}
                        <div>
                          <Seat seats={cabinClassArray} />
                        </div>
                      </div>
                    )
                  );                  
                }
                return null; 
              })
            }
          </div>
          <div style = {{
            overflowX: "auto",
            overflowY: "auto",
            marginTop: "20px",
          }}>
            {/* <Seat seats={renderArray} /> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    (!isEditMode || render) && (<div style={{display: 'flex', flexDirection: 'column'}}>
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
                <Sofa style={{color: "#777777"}} width={25} height={25}/>
              </div>
              <div style={{color: "#1B273A", fontSize: "28px", fontWeight: 700, lineHeight: "28.8px", textAlign: "left", textUnderlinePosition: "from-font", textDecorationSkipInk: "none"}}>
                Flight Seating Plan
              </div>
            </div>
            <div style={{
              color: "#777777", fontSize: "14px", fontWeight: 400,
              lineHeight: "16.8px", textAlign: "left", textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none", marginTop: "5px"
            }}>
              Visualises the seating plan along with prices for each seat.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
            <div>
              <button onClick={() => {
                handleSubmit();
              }} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Submit</button>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center" style={{width: "90%"}}>
          <div>
            <div>
              <label
                htmlFor="dropdown"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700"
              >
                Choose an option:
              </label>
            </div>
          </div>
          <div>
            <select
              id="dropdown"
              onChange={(e) => setAisles(Number(e.target.value))}
              name="dropdown"
              className="mt-1 block w-40 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="1">1 Aisle</option>
              <option value="2">2 Aisles</option>
            </select>
          </div>
        </div>
        <div className="px-4 py-2 text-sm font-medium text-gray-700" style={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          }}>
            <div>
              Fill the form to complete the seating arrangement:
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
            <div>
              <button onClick={() => {
                setRowNumber();
                setRenderArray(seatingFormCabins(cabinClasses))
              }} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Generate Modal</button>
            </div>
            {renderArray && renderArray.length > 0 && (<div>
              <Modal content={modalContent()} width={"800px"} />
            </div>)}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              className="mt-3">
        <SeatingForm cabinClasses={cabinClassTemp} setCabinClasses={setCabinClassTemp} aisles={aisles} />
      </div>
    </div>)
  );
}

export default AddorEditAirplaneConfigurations;
