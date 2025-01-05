import React, {useState} from 'react'
import flight from '../JSONs/seats.json'
import Pagination from '../../components/Pagination'
import Table from '../../components/Table'
import AddRoadTwoToneIcon from '@mui/icons-material/AddRoadTwoTone';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import Groups3TwoToneIcon from '@mui/icons-material/Groups3TwoTone';
import { Group } from 'lucide-react';
import Modal from '../../components/Modal';
import Seat from "../../components/Seat";
import { Sofa } from 'lucide-react';

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
        "name" : "Seat Number",
        "displayName" : "Seat Number",
        "display" : true,
        "attributes" : [{
            "name" : "seatNumber",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {
            display: "inline-block",
            whiteSpace: "nowrap",
            color: "#036FE3",
            fontWeight: 600,
            padding: "6px 10px",
            borderRadius: "12px",
            backgroundColor: "#E8F5FF",
        },
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "",
        "renderCell" : (row) => {
            function splitSeat(seat) {
                const match = seat.match(/^(\d+)([A-Za-z])$/);
            
                if (match) {
                    const rowNumber = parseInt(match[1], 10);
                    const seatLetter = match[2];
                    return { rowNumber, seatLetter };
                } else {
                    throw new Error("Invalid seat format");
                }
            }

            const result = splitSeat(row.seatNumber);

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
                            borderRight: "2px solid rgb(29 78 216 / var(--tw-bg-opacity, 1))",
                            textAlign: "right",
                            fontSize: "22px",
                            padding: "10px",
                            paddingLeft: "0px",
                            marginRight: "10px",
                            fontStyle: "italic",
                        }}
                    >
                        {row.seatNumber}
                    </div>
                    <div
                        style={{
                            textAlign: "left",
                            fontSize: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            lineHeight: "15px",
                        }}
                    >
                        <div>Row Number: {result.rowNumber}</div>
                        <div>Seat Letter: {result.seatLetter}</div>
                    </div>
                </div>
            );
        }
    },
    {
        "name" : "Seat Type",
        "displayName" : "Seat Type",
        "display" : true,
        "attributes" : [{
            "name" : "seatType",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {},
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "text-center",
        "renderCell" : (row) => {
            return(
                <div>
                    {
                        row.seatType === "window" ?
                        (<div style = {{
                            display: "inline-block",
                            backgroundColor: "#fffede",
                            color: "#FFD700",
                            padding: "4px 8px 4px 8px",
                            borderRadius: "12px",
                            fontWeight: 600,
                        }}>
                            <div>
                                <GridViewTwoToneIcon />
                            </div>
                            <div>
                                Window
                            </div>
                        </div>) : null
                    }
                    {
                        row.seatType === "aisle" ?
                        (<div style = {{
                            display: "inline-block",
                            backgroundColor: "#ede0ff",
                            color: "#742be2",
                            padding: "4px 8px 4px 8px",
                            borderRadius: "12px",
                            fontWeight: 600,
                            height: "52px",
                            width: "52px",
                        }}
                        >
                            <div>
                                <AddRoadTwoToneIcon />
                            </div>
                            <div>
                                Aisle
                            </div>
                        </div>) : null
                    }
                    {
                        row.seatType === "middle" ?
                        (<div style = {{
                            display: "inline-block",
                            backgroundColor: "#FFE5CC",
                            whiteSpace: "nowrap",
                            color: "#FF6700",
                            fontWeight: 600,
                            padding: "4px 8px",
                            borderRadius: "12px"
                        }}>
                            <div>
                                <Groups3TwoToneIcon />
                            </div>
                            <div>
                                Middle
                            </div>
                        </div>) : null
                    } 
                </div>
            )
        }
    },
    {
        "name" : "Seat Price",
        "displayName" : "Seat Price",
        "display" : true,
        "attributes" : [{
            "name" : "seatPrice",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {},
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "text-center",
        "renderCell" : (row) => {
            return (
                <div style = {{
                    color : "#67728A", 
                    fontWeight: 500,
                    fontSize: "15px",
                    fontStyle: "italic",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    textAlign: "center",
                    justifyContent: "center",
                    }}>
                        <div>
                            {row.seatPrice}
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-dollar-sign"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
                        </div>
                </div>
            )
        }
    },
    {
        "name" : "Seat Status",
        "displayName" : "Seat Status",
        "display" : true,
        "attributes" : [{
            "name" : "seatStatus",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }], 
        "cellStyle" : {},
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "text-center",
        "renderCell" : (row) => {
            return(
                <div>
                    {
                        row.seatStatus === "Unoccupied" ?
                        (<div style = {{display: "inline-block",
                            backgroundColor: "#F7F9FA",
                            whiteSpace: "nowrap",
                            color : "#67728A",
                            fontWeight: 600,
                            padding: "4px 8px 4px 8px",
                            borderRadius: "24px"}}>
                              Unoccupied
                        </div>) : (
                            <div style = {{display: "inline-block",
                                backgroundColor: "#CEFFED",
                                whiteSpace: "nowrap",
                                color : "#15845C",
                                fontWeight: 600,
                                padding: "4px 8px 4px 8px",
                                borderRadius: "24px"}}>
                                 Occupied
                            </div>
                        )
                    }
                </div>
            )
        }
    },
    {
        "name" : "Seat Class",
        "displayName" : "Seat Class",
        "display" : true,
        "attributes" : [{
            "name" : "seatClass",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {},
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "text-center",
        "renderCell" : (row) => {
            return (
                <div>
                    {
                        row.seatClass === "First Class" ?
                        (<div style={{
                            display: "inline-block",
                            backgroundColor: "#fffede",
                            color: "#FFD700",
                            padding: "4px 8px 4px 8px",
                            borderRadius: "24px",
                            fontWeight: 600,
                        }}>
                            {row.seatClass}
                        </div>) : null
                    }
                    {
                        row.seatClass === "Business Class" ?
                        (<div style={{
                            display: "inline-block",
                            backgroundColor: "#ede0ff",
                            color: "#742be2",
                            padding: "4px 8px 4px 8px",
                            borderRadius: "24px",
                            fontWeight: 600,
                        }}>
                            {row.seatClass}
                        </div>) : null
                    }
                    {
                        row.seatClass === "Premium Economy Class" ?
                        (<div style = {{
                            display: "inline-block",
                            backgroundColor: "#FFE5CC",
                            whiteSpace: "nowrap",
                            color: "#FF6700",
                            fontWeight: 600,
                            padding: "4px 8px",
                            borderRadius: "12px"
                        }}>
                            {row.seatClass}
                        </div>) : null
                    } 
                    {
                        row.seatClass === "Economy Class" ?
                        (<div style = {{
                            display: "inline-block",
                            backgroundColor: "#ffd8cc",
                            whiteSpace: "nowrap",
                            color: "#FF0000", // Changed to red
                            fontWeight: 600,
                            padding: "4px 8px",
                            borderRadius: "12px"
                        }}>
                            {row.seatClass}
                        </div>) : null
                    }
                </div>
            )
        }
    },
    {
        "name" : "Food",
        "displayName" : "Food",
        "display" : true,
        "attributes" : [{
            "name" : "food",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {},
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "text-center",
        "renderCell": (row) => {
            return(
                <div>
                    {
                        !row.food ?
                        (<div style = {{
                            display: "inline-block",
                            backgroundColor: "#ffd8cc",
                            whiteSpace: "nowrap",
                            color: "#FF0000", // Changed to red
                            fontWeight: 600,
                            padding: "4px 8px",
                            borderRadius: "12px"
                        }}>
                              None Ordered
                        </div>) : (
                            <div style = {{display: "inline-block",
                                backgroundColor: "#CEFFED",
                                whiteSpace: "nowrap",
                                color : "#15845C",
                                fontWeight: 600,
                                padding: "4px 8px 4px 8px",
                                borderRadius: "24px"}}>
                                 {row.food}
                            </div>
                        )
                    }
                </div>
            )
        }
    },
    {
        "name" : "Extra Legroom",
        "displayName" : "Extra Legroom",
        "display" : true,
        "attributes" : [{
            "name" : "extraLegroom",
            "attributeStyles": {},
            "attributeClassName" : "text-center",
        }],
        "cellStyle" : {},
        "cellClassName" : "text-center",
        "titleStyle" : {
            whiteSpace: "nowrap",
        },
        "titleClassName" : "text-center",  
        "renderCell" : (row) =>{
            return(
                <div>
                    <input type="checkbox" value={true} checked = {row.extraLegroom} style = {{
                        "accentColor": "blue",
                        "width": "12px",
                        "height": "12px",
                    }} />
                </div>
            )
        }
    }
]

function Seats() {
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10; 
    let seats = 0;

    const data = flight.rows;
    const allSeats = data.flatMap(row => row.seats);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    flight.rows.map((row) => {
        seats += row.seats.length;
    });
  
    const totalPages = Math.ceil(seats / rowsPerPage);

    console.log(totalPages);
  
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        className="mt-10"
      >
        <Modal content={modalContent(flight.cabinClassList)} width={"800px"} />
        <Table
          data={allSeats}
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

export default Seats
