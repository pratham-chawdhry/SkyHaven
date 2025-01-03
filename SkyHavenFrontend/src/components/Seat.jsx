import React from 'react';
import { Tooltip } from 'react-tooltip';

const colours = {
  "FirstClass": "#fbff05",             
  "FirstClassXL": "#FFD700",          
  "BusinessClass": "#ab00c9",           
  "BusinessClassXL": "#800080",         
  "PremiumEconomyXL": "#ff057e",        
  "PremiumEconomy": "#ff050d",         
  "EconomyXL": "#52d9f7",         
  "EconomyWithCost": "#ff7700",      
  "Occupied": "#D1D5DB",
  "FreeFirstClass": "#ADFF2F",         
  "FreeBusinessClass": "#32CD32",      
  "FreePremiumEconomy": "#00ffbb",     
  "FreeEconomy": "#00FF7F"             
};

const textColours = {
  "First Class": "white",
  "Business Class": "white",
  "Premium Economy Class": "white",
  "Economy Class": "white",
  "Occupied": "white",
};

function SeatGrid({ seats }) {
  const getColor = (seat) => {
    if (seat.occupied === "Yes") return colours.Occupied;

    const isFree = seat.free;
    const isXL = seat.extraLegroom;
    const seatType = seat.seatType;

    switch (seatType) {
      case "First Class":
        return isFree ? colours.FreeFirstClass : isXL ? colours.FirstClassXL : colours.FirstClass;
      case "Business Class":
        return isFree ? colours.FreeBusinessClass : isXL ? colours.BusinessClassXL : colours.BusinessClass;
      case "Premium Economy Class":
        return isFree ? colours.FreePremiumEconomy : isXL ? colours.PremiumEconomyXL : colours.PremiumEconomy;
      case "Economy Class":
        return isFree ? colours.FreeEconomy : isXL ? colours.EconomyXL : colours.EconomyWithCost;
      default:
        return "#ffffff";
    }
  };

  const getTextColour = (seat) => textColours[seat.seatType] || "white";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {seats.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "flex",
            gap: "3px",
            alignItems: "center",
          }}
        >
          {row.map((seat, seatIndex) =>
            seat ? (
              <div
                key={seatIndex}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  padding: "4px",
                  textAlign: "center",
                }}
                data-tooltip-id="seat-tooltip"
                data-tooltip-content={`Seat Number: ${seat.seatNumber}${seat.extraLegroom ? ", Extra Legroom" : ""}, ${seat.price > 0 ? `Price: $${seat.price}` : "Free"}`}
              >
                {seat.extraLegroom === true && (
                  <div
                    style={{
                      backgroundColor: getColor(seat),
                      fontSize: "12px",
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                      color: "white",
                      fontWeight: "500",
                    }}
                    data-tooltip-id="seat-tooltip"
                    data-tooltip-content={`Seat Number: ${seat.seatNumber}${seat.extraLegroom ? ", Extra Legroom" : ""}, ${seat.price > 0 ? `Price: $${seat.price}` : "Free"}`}
                  >
                    XL
                  </div>
                )}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    fontSize: "12px",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "500",
                    backgroundColor: getColor(seat),
                    color: getTextColour(seat),
                  }}
                  data-tooltip-id="seat-tooltip"
                  data-tooltip-content={`Seat Number: ${seat.seatNumber}${seat.extraLegroom ? ", Extra Legroom" : ""}, ${seat.price > 0 ? `Price: $${seat.price}` : "Free"}`}
                >
                  {seat.occupied === "No" ? seat.seatNumber : null}
                </div>
              </div>
            ) : (
              <div
                key={seatIndex}
                style={{
                  width: "50px",
                  height: "50px",
                }}
              ></div>
            )
          )}
        </div>
      ))}
      <Tooltip id="seat-tooltip" place="top" effect="solid" />
    </div>
  );  
}

export default SeatGrid;
