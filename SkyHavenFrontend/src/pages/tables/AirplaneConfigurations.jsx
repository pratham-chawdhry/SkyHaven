import Pagination from '../../components/Pagination';
import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import Table from "../../components/Table";
import { roRO } from "@mui/x-date-pickers";
import { Sofa } from 'lucide-react';
import Seat from "../../components/Seat";
import { useGlobalContext } from '../../context.jsx';

const seatingFormCabins = (cabinClasses, startRowNumber,aisles) => {
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

                    console.log("sectionIndex: " + sectionIndex, " aisles: " + aisles);
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


const modalContent = (row) => {

    let cabinClassNumber = 0;
    let rowNumber = 0;

    row.cabinClasses.forEach((cabinClass, cabinIndex) => {
      if (!cabinClass.disabled) {
        cabinClassNumber = cabinClassNumber + 1;
      }
    });
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
            {`The seating plan is generated based on the number of rows, seating arrangement in a sequential order as filled in the form, and the aisles. The number of aisles is set to ${row.aisles} and the seats are arranged in ${cabinClassNumber} cabin classes. The classes are as follows:`}
          </div>
          {
              row.cabinClasses.map((cabinClass, cabinIndex) => {
                if (!cabinClass.disabled) {
                  let seatsArray = [];
                  seatsArray.push(cabinClass)
                  let cabinClassArray = seatingFormCabins(seatsArray, cabinClass.seating[0].startRow - 1, row.aisles);
                  console.log(cabinClassArray);
                  return (
                    <div key={cabinIndex}>
                      <div className="mt-5 mb-5" style = {{color: "#1B273A", fontSize: "20px", fontWeight: 600, lineHeight: "28.8px", textAlign: "left", textUnderlinePosition: "from-font", textDecorationSkipInk: "none"}}>
                        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                          <div>
                            {cabinClass.cabinName}
                          </div>
                          <div style = {{
                              display: "inline-block",
                              backgroundColor: "#E8F5FF",
                              whiteSpace: "nowrap",
                              color: "#036FE3",
                              fontWeight: 600,
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              lineHeight: "17px",
                          }}>
                            {cabinClass.cabinCode}
                          </div>
                        </div>
                      </div>
                          <ul style = {{
                            listStyleType : "inherit",
                            fontSize : "14px",
                            lineHeight : "20px",
                            fontStyle : "italic",
                            marginBottom : "10px",
                          }}>
                            <li>{`The number of rows is ${cabinClassArray.length}.`}</li>
                            {
                              cabinClass.seating.map((seat, seatIndex) => {
                                return (
                                  <>
                                    {renderSeatPricing(seat, seatIndex, row)}
                                  </>
                                )
                              })
                            }
                          </ul>
                      <div>
                      </div>
                      <div>
                        <Seat seats={cabinClassArray} />
                      </div>
                    </div>
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


function renderSeatPricing(seat, seatIndex, row) {
    const renderRowRange = (start, end) => `The rows ${start} to ${end}`;
    const renderSingleRow = (row) => `Row ${row}`;
  
    const renderPricingDetails = (seat) => {
      if (seat.windowPrice === seat.middlePrice && seat.middlePrice === seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.windowPrice} for any seat.`;
      }
      if (seat.windowPrice !== seat.middlePrice && seat.middlePrice !== seat.aislePrice && seat.windowPrice !== seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window seats, $${seat.middlePrice} for middle seats, and $${seat.aislePrice} for aisle seats.`;
      }
      if (seat.windowPrice === seat.aislePrice && seat.windowPrice !== seat.middlePrice) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window and aisle seats, and $${seat.middlePrice} for middle seats.`;
      }
      if (seat.windowPrice === seat.middlePrice && seat.middlePrice !== seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window and middle seats, and $${seat.aislePrice} for aisle seats.`;
      }
      if (seat.middlePrice === seat.aislePrice && seat.windowPrice !== seat.middlePrice) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.middlePrice} for middle and aisle seats, and $${seat.windowPrice} for window seats.`;
      }
    };
  
    const renderFreeSeatsDetails = (seat) => {
      if (seat.windowPrice === 0 && seat.middlePrice === 0 && seat.aislePrice === 0) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and all seats are free.`;
      }
      if (seat.windowPrice === 0 && seat.middlePrice !== 0 && seat.aislePrice !== 0 && seat.middlePrice !== seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.middlePrice} for middle seats and $${seat.aislePrice} for aisle seats, while window seats are free.`;
      }
      if (seat.windowPrice !== 0 && seat.middlePrice === 0 && seat.aislePrice !== 0 && seat.windowPrice !== seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window seats and $${seat.aislePrice} for aisle seats, while middle seats are free.`;
      }
      if (seat.windowPrice !== 0 && seat.middlePrice !== 0 && seat.aislePrice === 0 && seat.windowPrice !== seat.middlePrice) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window seats and $${seat.middlePrice} for middle seats, while aisle seats are free.`;
      }
      if (seat.windowPrice === seat.middlePrice && seat.aislePrice === 0) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window and middle seats, while aisle seats are free.`;
      }
      if (seat.windowPrice === seat.aislePrice && seat.middlePrice === 0) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window and aisle seats, while middle seats are free.`;
      }
      if (seat.windowPrice === 0 && seat.middlePrice === seat.aislePrice) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.middlePrice} for middle and aisle seats, while window seats are free.`;
      }
      if (seat.windowPrice !== 0 && seat.middlePrice === 0 && seat.aislePrice === 0) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.windowPrice} for window seats, while middle and aisle seats are free.`;
      }
      if (seat.windowPrice === 0 && seat.middlePrice !== 0 && seat.aislePrice === 0) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.middlePrice} for middle seats, while window and aisle seats are free.`;
      }
      if (seat.windowPrice === 0 && seat.middlePrice === 0 && seat.aislePrice !== 0) {
        return `follows the order ${seat.seatSeating.slice(0, row.aisles + 1).join("-")}, and the price is $${seat.aislePrice} for aisle seats, while window and middle seats are free.`;
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
          ? (seat.windowPrice !== 0 && seat.middlePrice !== 0 && seat.aislePrice !== 0
              ? `${renderRowRange(seat.startRow, seat.endRow)} ${renderPricingDetails(seat)} ${extraLegroomDetails(seat)}`
              : `${renderRowRange(seat.startRow, seat.endRow)} ${renderFreeSeatsDetails(seat)} ${extraLegroomDetails(seat)}`)
          : (seat.windowPrice !== 0 && seat.middlePrice !== 0 && seat.aislePrice !== 0
              ? `${renderSingleRow(seat.startRow)} ${renderPricingDetails(seat)} ${extraLegroomDetails(seat)}`
              : `${renderSingleRow(seat.startRow)} ${renderFreeSeatsDetails(seat)} ${extraLegroomDetails(seat)}`)}
      </li>
    );
  }

const columnName = [
    {
        "name": "Airplane Configuration Id",
        "displayName": "Airplane Configuration Id",
        "display": true,
        "attributes": [{
            "name": "id",
            "attributeStyles": {
                "fontWeight": 500,
                "color": "#036FE3"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {},
        "cellClassName": "text-center",
        "titleStyle": {
            "whiteSpace": "nowrap"
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
                "display": "inline-block",
                "backgroundColor": "#E8F5FF",
                "whiteSpace": "nowrap",
                "color": "#036FE3",
                "fontWeight": 600,
                "padding": "4px 8px 4px 8px",
                "borderRadius": "24px"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            "display": "inline-block"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            "whiteSpace": "nowrap"
        },
        "titleClassName": "",
        "renderCell": null
    },
    {
        "name": "Airline Code",
        "displayName": "Airline Code",
        "display": true,
        "attributes": [{
            "name": "airline.airlineCode",
            "attributeStyles": {
                "display": "inline-block",
                "backgroundColor": "#CEFFED",
                "whiteSpace": "nowrap",
                "color": "#15845C",
                "fontWeight": 600,
                "padding": "4px 8px 4px 8px",
                "borderRadius": "6px"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            "display": "inline-block"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            "whiteSpace": "nowrap"
        },
        "titleClassName": "",
        "renderCell": null
    },
    {
        "name" : "Aisles",
        "displayName" : "Aisles",
        "display" : true,
        "attributes" : [{
            "name" : "aisles",
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
        "titleClassName" : "text-center",
        "renderCell" : (row) => {
            return (
                <div>
                    {row.aisles}{" aisles"}
                </div>
            )
        }
    },
    {
        "name" : "View",
        "displayName" : "View",
        "display" : true,
        "attributes" : [],
        "cellStyle" : {},
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
        "titleClassName" : "text-center",
        "renderCell" : (row) => {
            return (
                <Modal content={modalContent(row)} width={"800px"} />
            )
        }
    },
    {
        "name" : "First Class Cabin",
        "displayName" : "First Class Cabin",
        "display" : true,
        "attributes" : [{
            "name" : "cabinClasses.0.cabinName",
            "attributeStyles": {},
            "attributeClassName" : "",
        }],
        "cellStyle" : {
            width: "500px",
            padding: "0px 20px",
        },
        "cellClassName" : "",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
        "titleClassName" : "text-center",
        "renderCell" : (row) => {
            return (
                <div style={{fontStyle: "italic"}}>
                    {row.cabinClasses[0].disabled ? (
                        "Disabled"
                    ) : (
                    <div className="text-left">
                        {row.cabinClasses[0].seating.map((seat, seatIndex) => (
                            <div key={seatIndex}>
                            {renderSeatPricing(seat, seatIndex, row)}
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
            )
        }
    },
    {
        "name" : "Business Class Cabin",
        "displayName" : "Business Class Cabin",
        "display" : true,
        "attributes" : [{
            "name" : "cabinClasses.1.cabinName",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {
            width: "500px",
            padding: "0px 20px",
        },
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
        "titleClassName" : "text-center",
        "renderCell" : (row) => {
            return (
                <div style={{fontStyle: "italic"}}>
                    {row.cabinClasses[1].disabled ? (
                        "Disabled"
                    ) : (
                    <div className="text-left">
                        {row.cabinClasses[1].seating.map((seat, seatIndex) => (
                            <div key={seatIndex}>
                            {renderSeatPricing(seat, seatIndex, row)}
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
            )
        }
    },
    {
        "name" : "Premium Economy Class Cabin",
        "displayName" : "Premium Economy Class Cabin",
        "display" : true,
        "attributes" : [{
            "name" : "cabinClasses.2.cabinName",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {
            width: "500px",
            padding: "0px 20px",
        },
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
        "titleClassName" : "text-center",
        "renderCell" : (row) => {
            return (
                <div style={{fontStyle: "italic"}}>
                    {row.cabinClasses[2].disabled ? (
                        "Disabled"
                    ) : (
                    <div className="text-left">
                        {row.cabinClasses[2].seating.map((seat, seatIndex) => (
                            <div key={seatIndex}>
                            {renderSeatPricing(seat, seatIndex, row)}
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
            )
        }
    },
    {
        "name" : "Economy Class Cabin",
        "displayName" : "Economy Class Cabin",
        "display" : true,
        "attributes" : [{
            "name" : "cabinClasses.3.cabinName",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {
            width: "500px",
            padding: "0px 20px",
        },
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap"
        },
        "titleClassName" : "text-center",
        "renderCell" : (row) => {
            return (
                <div style={{fontStyle: "italic"}}>
                    {row.cabinClasses[3].disabled ? (
                        "Disabled"
                    ) : (
                    <div className="text-left">
                        {row.cabinClasses[3].seating.map((seat, seatIndex) => (
                            <div key={seatIndex}>
                            {renderSeatPricing(seat, seatIndex, row)}
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
            )
        }
    },
]

function AirplaneConfigurations() {
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10; 
    const [loading, setLoading] = useState(true);
    let totalPages = 0;

    const [airplaneConfigurations, setAirplaneConfigurations] = useState([]);

    const { getAirplaneConfigurations, deleteAirplaneConfiguration } = useGlobalContext();

    const deleteObject = async (id) => {
        try {
            const result = await deleteAirplaneConfiguration(id);
            if (result){
                setAirplaneConfigurations(result);
            }
        } catch (error) {
            console.error("Error deleting airplane configuration:", error);
        }
    };

    useEffect(() => {
        const fetchAirplaneConfigurations = async () => {
            try {
                const result = await getAirplaneConfigurations();
                if (result){
                    setAirplaneConfigurations(result);
                    setLoading(false);
                    console.log(result);
                }
            } catch (error) {
                console.error("Error fetching airplane configurations:", error);
            }
        };
    
        fetchAirplaneConfigurations();
    }, []);

    if (!loading) {
      totalPages = Math.ceil(airplaneConfigurations.length / rowsPerPage);
    }

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        className="mt-10"
      >
        <Table
          data={airplaneConfigurations}
          columnName={columnName}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handlePageChange={handlePageChange}
          loading={loading}
          deletefunc={deleteObject}
          deleteFlag = {true}
          id = {"id"}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    );
}

export default AirplaneConfigurations
