
import React from "react";
import "./Table.css";
import { PencilLine } from "lucide-react";
import { Trash2 } from "lucide-react";

const getNestedValue = (obj, attribute) => {
  return attribute.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export default function Table({ data, columnName, currentPage, rowsPerPage, handlePageChange }) {
  const slicedData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  console.log(data, slicedData);
  return (
    <div
      style={{
        overflowX: "auto",
        overflowY: "auto",
        border: "2px solid #E2E2E2",
        height: "500px",
        width: "90%",
      }}
      className="bg-white shadow-md rounded-lg mt-10 mb-10"
    >
      <table>
        <thead>
          <tr>
            <th
              className="py-2"
              style={{
                paddingLeft: "2rem",
                paddingRight: "1rem",
              }}
            >
              <input type="checkbox" className="w-3 h-3" />
            </th>
            {columnName.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-2 ${column.titleClassName}`}
                style={column.titleStyle}
              >
                {column.displayName}
              </th>
            ))}
            <th className="py-2 justify-center">Edit</th>
          </tr>
        </thead>
        <tbody>
          {slicedData.map((row, index) => {
            console.log(row);
            return(
            <tr className="flex-col justify-center" key={index}>
              <td
                className="py-2 justify-center ml-10"
                style={{
                  paddingLeft: "2rem",
                  paddingRight: "1rem",
                }}
              >
                <div className="text-center">
                  <input type="checkbox" className="w-3 h-3" />
                </div>
              </td>
              {columnName.map((column, columnIndex) => {
                console.log(column);
                return (
                <td key={columnIndex} className="py-2 justify-center text-center">
                  <div style={column.cellStyle} className={column.cellClassName}>
                    {column.renderCell ? (
                      column.renderCell(row)
                    ) : (
                      column.attributes.map((attribute, index) => (
                        <div style={attribute.attributeStyles} className={attribute.attributeClassName} key={index}>
                          {getNestedValue(row, attribute.name)}
                        </div>
                      ))
                    )}
                  </div>
                </td>
              )})}
              <td className="py-2 px-2 justify-center">
                <div className="text-center">
                  <button className="bg-blue-600 text-white py-2 px-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-[1.02] duration-200 shadow-lg hover:shadow-xl">
                    <PencilLine className="w-3 h-3" />
                  </button>
                </div>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
}
