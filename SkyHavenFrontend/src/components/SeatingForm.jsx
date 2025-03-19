import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { Plus, Trash2 } from "lucide-react";
import { set } from "date-fns";

export default function seatingForm({cabinClasses, setCabinClasses, aisles}) {
    const handleAddRowSeats = (cabinIndex, rowIndex) => {
        setCabinClasses((prevClasses) => {
          const updatedClasses = prevClasses.map((cabinClass, index) => {
            if (index === cabinIndex) {
              const updatedSeating = [...cabinClass.seating]; 
              const newRow = {
                id : undefined, 
                numberOfRows: null,
                startRow: null,
                endRow: null,
                aislePrice: null,
                middlePrice: null,
                windowPrice: null,
                extraLegroom: false,
                seatSeating : [0,0,0]
              };
    
              updatedSeating.splice(rowIndex + 1, 0, newRow);
      
              return { ...cabinClass, seating: updatedSeating };
            }
      
            return cabinClass; 
          });
      
          return updatedClasses;
        });
      };
    
    const deleteRow = (cabinIndex, rowIndex) => {
        setCabinClasses((prevClasses) => {
            const updatedClasses = prevClasses.map((cabinClass, index) => {
            if (index === cabinIndex) {
                const updatedSeating = [...cabinClass.seating]; 
                updatedSeating.splice(rowIndex, 1);
                return { ...cabinClass, seating: updatedSeating };
            }
        
            return cabinClass; 
            });
        
            return updatedClasses;
        });
    };

    const disableRow = (cabinIndex) => {
        setCabinClasses((prevClasses) => {
            const updatedClasses = prevClasses.map((cabinClass, index) => {
            if (index === cabinIndex) {
                return { ...cabinClass, disabled: !cabinClass.disabled };
            }
        
            return cabinClass; 
            });
        
            return updatedClasses;
        });
    };

    const updateRow = (cabinIndex, rowIndex, rows) => {
        setCabinClasses((prevClasses) => {
            const updatedClasses = prevClasses.map((cabinClass, index) => {
            if (index === cabinIndex) {
                const updatedSeating = [...cabinClass.seating]; 
                updatedSeating[rowIndex].numberOfRows = rows;
                return { ...cabinClass, seating: updatedSeating };
            }
        
            return cabinClass; 
            });
        
            return updatedClasses;
        });
    };

    const updateSeat = (cabinIndex, rowIndex, seatIndex, seat) => {
        setCabinClasses((prevClasses) => {
          const updatedClasses = prevClasses.map((cabinClass, index) => {
            if (index === cabinIndex) {
              const updatedSeating = [...cabinClass.seating]; 
              updatedSeating[rowIndex].seatSeating[seatIndex] = seat;
              return { ...cabinClass, seating: updatedSeating };
            }
      
            return cabinClass; 
          });
      
          return updatedClasses;
        });
    };
    
    const updatePrice = (cabinIndex, rowIndex, price, attribute) => {
        console.log(cabinClasses);
        setCabinClasses((prevClasses) => {
            const updatedClasses = prevClasses.map((cabinClass, index) => {
            if (index === cabinIndex) {
                const updatedSeating = [...cabinClass.seating]; 
                updatedSeating[rowIndex][attribute] = price;
                return { ...cabinClass, seating: updatedSeating };
            }
        
            return cabinClass; 
            });
        
            return updatedClasses;
        });
    };

    const updateExtraLegroom = (cabinIndex, rowIndex) => {
        console.log(cabinIndex, rowIndex);
        setCabinClasses((prevClasses) => {
            const updatedClasses = prevClasses.map((cabinClass, index) => {
                if (index === cabinIndex) {
                    const updatedSeating = cabinClass.seating.map((seat, idx) => {
                        if (idx === rowIndex) {
                            return { ...seat, extraLegroom: !seat.extraLegroom };
                        }
                        return seat;
                    });

                    return { ...cabinClass, seating: updatedSeating };
                }
    
                return cabinClass; 
            });
    
            return updatedClasses;
        });
    };    
    
    return (
    <div style={{
          overflowX: "auto",
          overflowY: "auto",
          border: "2px solid #E2E2E2",
          height: "500px",
          width: "90%",
        }}
        className="bg-white shadow-md rounded-lg mb-10">
        <table style={{
            backgroundColor: "white",
            whiteSpace: "nowrap"
        }}>
            <thead>
                <tr style={{fontStyle: "italic"}}>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium ">Cabin Name</th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Number of Rows</th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Seats</th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Aisle Price</th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Middle Price</th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Window Price</th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Extra Legroom</th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Enable/Disable</th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Add Row</th>
                    <th className="px-4 py-2 text-center text-gray-700 font-medium">Delete Row</th>
                </tr>
            </thead>
            <tbody>
                {cabinClasses.map((cabinClass, cabinIndex) => (
                    cabinClass.seating.map((_, rowIndex) => (
                        <tr key={rowIndex} className="border-b" >
                            <td className="px-4 py-2 text-gray-700 font-medium text-left" style={cabinClass.disabled ? {opacity: "0.5"} : {}}>
                                {rowIndex ===0 && cabinClass.cabinName}{rowIndex ===0 && `:`}
                            </td>
                            <td className="text-center">
                                <div className="text-center">
                                    <div className="relative flex items-center">
                                        <div>
                                            <input
                                                value={cabinClass.seating[rowIndex].numberOfRows || ""}
                                                disabled={cabinClass.disabled}
                                                onChange={(e) => updateRow(cabinIndex, rowIndex, Number(e.target.value))}
                                                className="pl-4 block w-20 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                style={cabinClass.disabled ? { opacity: "0.6" } : {}}
                                            />
                                        </div>
                                        <div className="absolute right-1 text-gray-500"
                                                style={cabinClass.disabled ? { opacity: "0.6" } : {}}
                                            >
                                                rows
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="flex gap-2 items-center justify-center">
                                {Array(aisles + 1)
                                .fill(null)
                                .map((_, index) => (
                                    <React.Fragment key={index}>
                                    <input
                                        onChange={(e) => updateSeat(cabinIndex, rowIndex, index, Number(e.target.value))}
                                        value = {cabinClass.seating[rowIndex].seatSeating[index] || ""}
                                        disabled = {cabinClass.disabled}
                                        className="block w-20 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        style={cabinClass.disabled ? {opacity: "0.6"} : {}}
                                    />
                                    {index < aisles && <span>-</span>}
                                    </React.Fragment>
                                ))}
                            </td>
                            <td>
                                <div className="flex gap-2 items-center">
                                    <span style={cabinClass.disabled ? { opacity: "0.6" } : {}}>Aisle:</span>
                                    <div className="relative flex items-center">
                                        <span
                                        className="absolute left-2 text-gray-500"
                                        style={cabinClass.disabled ? { opacity: "0.6" } : {}}
                                        >
                                        $
                                        </span>
                                        <input
                                        onChange={(e) => updatePrice(cabinIndex, rowIndex, Number(e.target.value), "aislePrice")}
                                        value={cabinClass.seating[rowIndex].aislePrice || ""}
                                        disabled={cabinClass.disabled}
                                        className="pl-6 block w-20 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        style={cabinClass.disabled ? { opacity: "0.6" } : {}}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex gap-2 items-center">
                                    <span style={cabinClass.disabled ? { opacity: "0.6" } : {}}>Middle:</span>
                                    <div className="relative flex items-center">
                                        <span
                                        className="absolute left-2 text-gray-500"
                                        style={cabinClass.disabled ? { opacity: "0.6" } : {}}
                                        >
                                        $
                                        </span>
                                        <input
                                        onChange={(e) => updatePrice(cabinIndex, rowIndex, Number(e.target.value), "middlePrice")}
                                        value={cabinClass.seating[rowIndex].middlePrice || ""}
                                        disabled={cabinClass.disabled}
                                        className="pl-6 block w-20 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        style={cabinClass.disabled ? { opacity: "0.6" } : {}}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex gap-2 items-center">
                                    <span style={cabinClass.disabled ? { opacity: "0.6" } : {}}>Window:</span>
                                    <div className="relative flex items-center">
                                        <span
                                        className="absolute left-2 text-gray-500"
                                        style={cabinClass.disabled ? { opacity: "0.6" } : {}}
                                        >
                                        $
                                        </span>
                                        <input
                                        onChange={(e) => updatePrice(cabinIndex, rowIndex, Number(e.target.value), "windowPrice")}
                                        value={cabinClass.seating[rowIndex].windowPrice || ""}
                                        disabled={cabinClass.disabled}
                                        className="pl-6 block w-20 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        style={cabinClass.disabled ? { opacity: "0.6" } : {}}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">
                                <input type="checkbox" disabled = {cabinClass.disabled} checked = {cabinClass.seating[rowIndex].extraLegroom} onChange = {() => updateExtraLegroom(cabinIndex, rowIndex)} />
                            </td>
                            <td className="text-center">
                                {rowIndex === 0 && (
                                    <Checkbox
                                    checked={!cabinClass.disabled}
                                    onChange={() => disableRow(cabinIndex)}
                                    />
                                )}
                            </td>
                            <td className="text-center">
                                <button
                                disabled = {cabinClass.disabled}
                                key={rowIndex}
                                onClick={() => handleAddRowSeats(cabinIndex, rowIndex)}
                                className="bg-blue-500 py-2 px-2 rounded-lg text-lg font-semibol transition-colors transform hover:scale-[1.02] duration-200 shadow-lg hover:shadow-xl"
                                style = {cabinClass.disabled ? {opacity: "0.5"} : {}}
                                >
                                <Plus
                                    className="w-4 h-4 border-1px"
                                    style={{ color: "white" }}
                                />
                                </button>
                            </td>
                            <td className="text-center">
                                {rowIndex !== 0 && <button
                                key={rowIndex}
                                disabled = {cabinClass.disabled}
                                onClick={() => deleteRow(cabinIndex, rowIndex)}
                                className="bg-red-500 py-2 px-2 rounded-lg text-lg font-semibol transition-colors transform hover:scale-[1.02] duration-200 shadow-lg hover:shadow-xl"
                                style = {cabinClass.disabled ? {opacity: "0.5"} : {}}
                                >
                                <Trash2
                                    className="w-4 h-4 border-1px"
                                    style={{ color: "white" }}
                                />
                                </button>}
                            </td>
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
    </div>
    )
}
